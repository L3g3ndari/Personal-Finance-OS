import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  accountId: z.string(),
  symbol: z.string().min(1).max(20),
  name: z.string().min(1).max(200),
  type: z.enum(["STOCK", "ETF", "MUTUAL_FUND", "BOND", "REIT", "CRYPTO", "OTHER"]),
  quantity: z.number(),
  costBasis: z.number(),
  currentPrice: z.number().optional(),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const investments = await prisma.investment.findMany({
      where: { account: { userId } },
      include: { account: { select: { id: true, name: true, type: true, institution: true } } },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(investments);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const account = await prisma.account.findFirst({ where: { id: body.accountId, userId } });
    if (!account) throw new ApiError(404, "Account not found");
    const investment = await prisma.investment.create({
      data: {
        ...body,
        quantity: String(body.quantity),
        costBasis: String(body.costBasis),
        currentPrice: body.currentPrice ? String(body.currentPrice) : null,
      },
      include: { account: { select: { id: true, name: true } } },
    });
    return successResponse(investment, 201);
  } catch (error) {
    return handleApiError(error);
  }
}