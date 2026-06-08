import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const bill = await prisma.bill.findFirst({ where: { id, userId } });
    if (!bill) throw new ApiError(404, "Bill not found");
    return successResponse(bill);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.bill.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Bill not found");
    const body = await req.json();
    const bill = await prisma.bill.update({
      where: { id },
      data: {
        ...body,
        amount: body.amount ? String(body.amount) : undefined,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
      },
    });
    return successResponse(bill);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.bill.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Bill not found");
    await prisma.bill.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}