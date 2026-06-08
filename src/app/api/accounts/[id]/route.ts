import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const updateAccountSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  type: z.enum(["CHECKING","SAVINGS","CREDIT_CARD","LOAN","MORTGAGE","BROKERAGE","IRA","ROTH_IRA","FOUR_HUNDRED_ONE_K","HSA","CRYPTO","CASH","CUSTOM"]).optional(),
  institution: z.string().max(200).optional(),
  currency: z.string().max(3).optional(),
  balance: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const account = await prisma.account.findFirst({ where: { id, userId } });
    if (!account) throw new ApiError(404, "Account not found");
    return successResponse(account);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.account.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Account not found");
    const body = await req.json();
    const data = updateAccountSchema.parse(body);
    const account = await prisma.account.update({
      where: { id },
      data: { ...data, balance: data.balance ? String(data.balance) : undefined },
    });
    return successResponse(account);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const existing = await prisma.account.findFirst({ where: { id, userId } });
    if (!existing) throw new ApiError(404, "Account not found");
    await prisma.account.delete({ where: { id } });
    return successResponse({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}