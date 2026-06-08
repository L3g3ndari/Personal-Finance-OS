import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createTransactionSchema = z.object({
  accountId: z.string(),
  amount: z.number(),
  date: z.string(),
  description: z.string().min(1).max(500),
  payee: z.string().max(200).optional(),
  notes: z.string().max(1000).optional(),
  isPending: z.boolean().default(false),
  categoryId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
});

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const accountId = url.searchParams.get("accountId");
    const categoryId = url.searchParams.get("categoryId");
    const search = url.searchParams.get("search");
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const sortBy = url.searchParams.get("sortBy") || "date";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    const where: any = {
      account: { userId },
    };
    if (accountId) where.accountId = accountId;
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.OR = [
        { description: { contains: search, mode: "insensitive" } },
        { payee: { contains: search, mode: "insensitive" } },
        { notes: { contains: search, mode: "insensitive" } },
      ];
    }
    if (startDate) where.date = { ...(where.date || {}), gte: new Date(startDate) };
    if (endDate) where.date = { ...(where.date || {}), lte: new Date(endDate) };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          category: true,
          tags: true,
          splits: { include: { category: true } },
        },
      }),
      prisma.transaction.count({ where }),
    ]);

    return successResponse({ transactions, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createTransactionSchema)(req);

    // Verify account belongs to user
    const account = await prisma.account.findFirst({ where: { id: body.accountId, userId } });
    if (!account) throw new ApiError(404, "Account not found");

    const { tagIds, ...txnData } = body;
    const transaction = await prisma.transaction.create({
      data: {
        ...txnData,
        amount: String(txnData.amount),
        date: new Date(txnData.date),
        tags: tagIds?.length
          ? { connect: tagIds.map((id) => ({ id })) }
          : undefined,
      },
      include: { category: true, tags: true, splits: true },
    });
    return successResponse(transaction, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

// Bulk update transactions
export async function PUT(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(
      z.object({
        ids: z.array(z.string()).min(1),
        updates: z.object({
          categoryId: z.string().optional(),
          isPending: z.boolean().optional(),
          notes: z.string().max(1000).optional(),
        }),
      })
    )(req);

    // Verify all transactions belong to user
    const transactions = await prisma.transaction.findMany({
      where: { id: { in: body.ids }, account: { userId } },
    });
    if (transactions.length !== body.ids.length) throw new ApiError(403, "Some transactions not found or unauthorized");

    await prisma.transaction.updateMany({
      where: { id: { in: body.ids } },
      data: body.updates,
    });

    return successResponse({ updated: body.ids.length });
  } catch (error) {
    return handleApiError(error);
  }
}