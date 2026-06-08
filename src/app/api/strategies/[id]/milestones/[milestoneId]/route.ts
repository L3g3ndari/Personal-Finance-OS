import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string; milestoneId: string }> }) {
  try {
    const { id: _id, milestoneId } = await params;
    const body = await req.json();
    const existing = await prisma.strategyMilestone.findUnique({ where: { id: milestoneId } });
    if (!existing) throw new ApiError(404, "Milestone not found");
    const milestone = await prisma.strategyMilestone.update({
      where: { id: milestoneId },
      data: {
        ...body,
        targetDate: body.targetDate ? new Date(body.targetDate) : undefined,
      },
    });
    return successResponse(milestone);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string; milestoneId: string }> }) {
  try {
    const { id: _id, milestoneId } = await params;
    const existing = await prisma.strategyMilestone.findUnique({ where: { id: milestoneId } });
    if (!existing) throw new ApiError(404, "Milestone not found");
    await prisma.strategyMilestone.delete({ where: { id: milestoneId } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}