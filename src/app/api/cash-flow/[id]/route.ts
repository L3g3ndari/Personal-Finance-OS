import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.cashFlowEntry.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Cash flow entry not found");
    const body = await req.json();
    const entry = await prisma.cashFlowEntry.update({
      where: { id },
      data: {
        ...body,
        income: body.income ? String(body.income) : undefined,
        expenses: body.expenses ? String(body.expenses) : undefined,
        savings: body.income && body.expenses ? String(body.income - body.expenses) : undefined,
        date: body.date ? new Date(body.date) : undefined,
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
    const existing = await prisma.cashFlowEntry.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Cash flow entry not found");
    await prisma.cashFlowEntry.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}