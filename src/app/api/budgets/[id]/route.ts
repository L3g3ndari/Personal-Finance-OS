import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const budget = await prisma.budget.findFirst({
      where: { id, userId },
      include: { categories: { include: { category: true } } },
    });
    if (!budget) throw new ApiError(404, "Budget not found");
    return successResponse(budget);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.budget.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Budget not found");
    const body = await req.json();
    const budget = await prisma.budget.update({ where: { id }, data: body });
    return successResponse(budget);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.budget.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Budget not found");
    await prisma.budget.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}