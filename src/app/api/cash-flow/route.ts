import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  date: z.string(),
  income: z.number(),
  expenses: z.number(),
});

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    const month = url.searchParams.get("month");

    const where: any = { userId };
    if (year) {
      const start = new Date(parseInt(year), month ? parseInt(month) - 1 : 0, 1);
      const end = month
        ? new Date(parseInt(year), parseInt(month), 1)
        : new Date(parseInt(year) + 1, 0, 1);
      where.date = { gte: start, lt: end };
    }

    const entries = await prisma.cashFlowEntry.findMany({
      where,
      orderBy: { date: "asc" },
    });
    return successResponse(entries);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const entry = await prisma.cashFlowEntry.create({
      data: {
        date: new Date(body.date),
        income: String(body.income),
        expenses: String(body.expenses),
        savings: String(body.income - body.expenses),
        userId,
      },
    });
    return successResponse(entry, 201);
  } catch (error) {
    return handleApiError(error);
  }
}