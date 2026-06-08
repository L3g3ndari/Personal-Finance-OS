import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.taxEntry.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Tax entry not found");
    const body = await req.json();
    const entry = await prisma.taxEntry.update({
      where: { id },
      data: {
        ...body,
        amount: body.amount ? String(body.amount) : undefined,
      },
    });
    return successResponse(entry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.taxEntry.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Tax entry not found");
    await prisma.taxEntry.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}