import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSplitSchema = z.object({
  amount: z.number(),
  categoryId: z.string().optional().nullable(),
  notes: z.string().max(500).optional(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const txn = await prisma.transaction.findFirst({ where: { id, account: { userId } } });
    if (!txn) throw new ApiError(404, "Transaction not found");
    const splits = await prisma.transactionSplit.findMany({
      where: { transactionId: id },
      include: { category: true },
    });
    return successResponse(splits);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const txn = await prisma.transaction.findFirst({ where: { id, account: { userId } } });
    if (!txn) throw new ApiError(404, "Transaction not found");

    const body = await parseBody(createSplitSchema)(req);
    const split = await prisma.transactionSplit.create({
      data: {
        transactionId: id,
        amount: String(body.amount),
        categoryId: body.categoryId,
        notes: body.notes,
      },
      include: { category: true },
    });
    return successResponse(split, 201);
  } catch (error) {
    return handleApiError(error);
  }
}