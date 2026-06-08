import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const entry = await prisma.decisionJournal.findFirst({ where: { id, userId } });
    if (!entry) throw new ApiError(404, "Journal entry not found");
    return successResponse(entry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.decisionJournal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Journal entry not found");
    const body = await req.json();
    const entry = await prisma.decisionJournal.update({
      where: { id },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : undefined,
        reviewDate: body.reviewDate ? new Date(body.reviewDate) : undefined,
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
    const existing = await prisma.decisionJournal.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Journal entry not found");
    await prisma.decisionJournal.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}