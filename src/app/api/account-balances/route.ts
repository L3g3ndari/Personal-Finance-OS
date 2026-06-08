import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  accountId: z.string(),
  balance: z.number(),
  date: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await parseBody(createSchema)(req);
    const account = await prisma.account.findUnique({ where: { id: body.accountId } });
    if (!account) throw new ApiError(404, "Account not found");
    const entry = await prisma.accountBalance.create({
      data: {
        accountId: body.accountId,
        balance: String(body.balance),
        date: body.date ? new Date(body.date) : new Date(),
      },
    });
    return successResponse(entry, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const accountId = url.searchParams.get("accountId");
    if (!accountId) return handleApiError(new ApiError(400, "accountId query param required"));
    const entries = await prisma.accountBalance.findMany({
      where: { accountId },
      orderBy: { date: "desc" },
      take: 100,
    });
    return successResponse(entries);
  } catch (error) {
    return handleApiError(error);
  }
}