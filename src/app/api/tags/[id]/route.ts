import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const existing = await prisma.transactionTag.findUnique({ where: { id } });
    if (!existing) throw new ApiError(404, "Tag not found");
    await prisma.transactionTag.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}