import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const forecast = await prisma.forecast.findFirst({ where: { id, userId } });
    if (!forecast) throw new ApiError(404, "Forecast not found");
    return successResponse(forecast);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.forecast.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Forecast not found");
    const body = await req.json();
    const forecast = await prisma.forecast.update({ where: { id }, data: body });
    return successResponse(forecast);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.forecast.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Forecast not found");
    await prisma.forecast.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}