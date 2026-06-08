import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createBudgetSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["TRADITIONAL", "ZERO_BASED", "ENVELOPE"]),
  period: z.enum(["MONTHLY", "QUARTERLY", "ANNUAL"]),
  startDate: z.string(),
  endDate: z.string().optional(),
  categories: z.array(z.object({
    categoryId: z.string(),
    limit: z.number(),
  })).optional(),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const budgets = await prisma.budget.findMany({
      where: { userId },
      include: { categories: { include: { category: true } } },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(budgets);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createBudgetSchema)(req);
    const { categories, ...budgetData } = body;
    const budget = await prisma.budget.create({
      data: {
        ...budgetData,
        startDate: new Date(budgetData.startDate),
        endDate: budgetData.endDate ? new Date(budgetData.endDate) : null,
        userId,
        categories: categories?.length
          ? { create: categories.map((c) => ({ categoryId: c.categoryId, limit: String(c.limit) })) }
          : undefined,
      },
      include: { categories: { include: { category: true } } },
    });
    return successResponse(budget, 201);
  } catch (error) {
    return handleApiError(error);
  }
}