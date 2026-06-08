import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const strategy = await prisma.strategy.findFirst({
      where: { id, userId },
      include: { milestones: { orderBy: { targetDate: "asc" } } },
    });
    if (!strategy) throw new ApiError(404, "Strategy not found");
    return successResponse(strategy);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.strategy.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Strategy not found");
    const body = await req.json();
    const strategy = await prisma.strategy.update({
      where: { id },
      data: {
        ...body,
        config: body.config !== undefined ? body.config : undefined,
      },
      include: { milestones: true },
    });
    return successResponse(strategy);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.strategy.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Strategy not found");
    await prisma.strategy.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}