import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).optional(),
  parentId: z.string().nullable().optional(),
});

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = updateSchema.parse(body);
    const existing = await prisma.transactionCategory.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Category not found");
    const category = await prisma.transactionCategory.update({ where: { id }, data });
    return successResponse(category);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.transactionCategory.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Category not found");
    await prisma.transactionCategory.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}