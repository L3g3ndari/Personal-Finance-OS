import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const updateSchema = z.object({
  accountId: z.string().optional(),
  amount: z.number().optional(),
  date: z.string().optional(),
  description: z.string().min(1).max(500).optional(),
  payee: z.string().max(200).optional(),
  notes: z.string().max(1000).optional().nullable(),
  isPending: z.boolean().optional(),
  categoryId: z.string().optional().nullable(),
  tagIds: z.array(z.string()).optional(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const transaction = await prisma.transaction.findFirst({
      where: { id, account: { userId } },
      include: { category: true, tags: true, splits: { include: { category: true } }, account: true },
    });
    if (!transaction) throw new ApiError(404, "Transaction not found");
    return successResponse(transaction);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.transaction.findFirst({ where: { id, account: { userId } } });
    if (!existing) throw new ApiError(404, "Transaction not found");

    const body = await req.json();
    const data = updateSchema.parse(body);
    const { tagIds, ...updateData } = data;

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...updateData,
        amount: updateData.amount ? String(updateData.amount) : undefined,
        date: updateData.date ? new Date(updateData.date) : undefined,
        tags: tagIds !== undefined
          ? { set: tagIds.map((tid) => ({ id: tid })) }
          : undefined,
      },
      include: { category: true, tags: true, splits: { include: { category: true } } },
    });
    return successResponse(transaction);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.transaction.findFirst({ where: { id, account: { userId } } });
    if (!existing) throw new ApiError(404, "Transaction not found");
    await prisma.transaction.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}