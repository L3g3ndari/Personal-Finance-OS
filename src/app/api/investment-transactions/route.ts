import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  investmentId: z.string(),
  type: z.enum(["BUY", "SELL", "DIVIDEND", "SPLIT"]),
  date: z.string(),
  quantity: z.number(),
  price: z.number(),
  fees: z.number().default(0),
  totalAmount: z.number(),
});

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const investment = await prisma.investment.findFirst({
      where: { id: body.investmentId, account: { userId } },
    });
    if (!investment) throw new ApiError(404, "Investment not found");
    const txn = await prisma.investmentTransaction.create({
      data: {
        ...body,
        date: new Date(body.date),
        quantity: String(body.quantity),
        price: String(body.price),
        fees: String(body.fees),
        totalAmount: String(body.totalAmount),
      },
    });
    return successResponse(txn, 201);
  } catch (error) {
    return handleApiError(error);
  }
}