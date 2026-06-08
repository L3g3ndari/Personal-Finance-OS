import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const investment = await prisma.investment.findFirst({
      where: { id, account: { userId } },
      include: { transactions: { orderBy: { date: "desc" } }, account: { select: { id: true, name: true } } },
    });
    if (!investment) throw new ApiError(404, "Investment not found");
    return successResponse(investment);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.investment.findFirst({ where: { id, account: { userId } } });
    if (!existing) throw new ApiError(404, "Investment not found");
    const body = await req.json();
    const investment = await prisma.investment.update({
      where: { id },
      data: {
        ...body,
        quantity: body.quantity ? String(body.quantity) : undefined,
        costBasis: body.costBasis ? String(body.costBasis) : undefined,
        currentPrice: body.currentPrice !== undefined ? String(body.currentPrice) : undefined,
      },
    });
    return successResponse(investment);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.investment.findFirst({ where: { id, account: { userId } } });
    if (!existing) throw new ApiError(404, "Investment not found");
    await prisma.investment.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}