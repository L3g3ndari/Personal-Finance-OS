import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const goal = await prisma.goal.findFirst({ where: { id, userId } });
    if (!goal) throw new ApiError(404, "Goal not found");
    return successResponse(goal);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.goal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Goal not found");
    const body = await req.json();
    const goal = await prisma.goal.update({
      where: { id },
      data: {
        ...body,
        targetAmount: body.targetAmount ? String(body.targetAmount) : undefined,
        currentAmount: body.currentAmount ? String(body.currentAmount) : undefined,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
      },
    });
    return successResponse(goal);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.goal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Goal not found");
    await prisma.goal.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}