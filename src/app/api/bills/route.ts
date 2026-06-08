import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  amount: z.number(),
  dueDate: z.string(),
  frequency: z.string().min(1).max(50),
  isAutoPay: z.boolean().default(false),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const bills = await prisma.bill.findMany({
      where: { userId },
      orderBy: { dueDate: "asc" },
    });
    return successResponse(bills);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const bill = await prisma.bill.create({
      data: {
        ...body,
        amount: String(body.amount),
        dueDate: new Date(body.dueDate),
        userId,
      },
    });
    return successResponse(bill, 201);
  } catch (error) {
    return handleApiError(error);
  }
}