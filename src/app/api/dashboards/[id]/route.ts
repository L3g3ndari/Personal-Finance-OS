import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const dashboard = await prisma.dashboard.findFirst({
      where: { id, userId },
      include: { widgets: { orderBy: [{ y: "asc" }, { x: "asc" }] } },
    });
    if (!dashboard) throw new ApiError(404, "Dashboard not found");
    return successResponse(dashboard);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.dashboard.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Dashboard not found");
    const body = await req.json();
    const { widgets, ...dashboardData } = body;

    // Handle widget updates if provided
    if (widgets) {
      await prisma.dashboardWidget.deleteMany({ where: { dashboardId: id } });
      if (widgets.length > 0) {
        await prisma.dashboardWidget.createMany({
          data: widgets.map((w: any) => ({
            dashboardId: id,
            type: w.type,
            title: w.title,
            config: w.config || {},
            x: w.x || 0,
            y: w.y || 0,
            w: w.w || 2,
            h: w.h || 2,
          })),
        });
      }
    }

    if (dashboardData.isDefault) {
      await prisma.dashboard.updateMany({ where: { userId, id: { not: id } }, data: { isDefault: false } });
    }

    const dashboard = await prisma.dashboard.update({
      where: { id },
      data: dashboardData,
      include: { widgets: { orderBy: [{ y: "asc" }, { x: "asc" }] } },
    });
    return successResponse(dashboard);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.dashboard.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Dashboard not found");
    await prisma.dashboard.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}