import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  accountId: z.string(),
  balance: z.number(),
  date: z.string().optional(),
});

export async function GET() {
  try {
    const categories = await prisma.transactionCategory.findMany({
      include: { children: true },
      where: { parentId: null },
      orderBy: { name: "asc" },
    });
    return successResponse(categories);
  } catch (error) {
    return handleApiError(error);
  }
}

const createCategorySchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
  parentId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await parseBody(createCategorySchema)(req);
    const category = await prisma.transactionCategory.create({ data: body });
    return successResponse(category, 201);
  } catch (error) {
    return handleApiError(error);
  }
}