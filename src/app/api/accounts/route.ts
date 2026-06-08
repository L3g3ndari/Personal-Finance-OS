import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createAccountSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["CHECKING","SAVINGS","CREDIT_CARD","LOAN","MORTGAGE","BROKERAGE","IRA","ROTH_IRA","FOUR_HUNDRED_ONE_K","HSA","CRYPTO","CASH","CUSTOM"]),
  institution: z.string().max(200).optional(),
  currency: z.string().max(3).default("USD"),
  balance: z.number().default(0),
  isActive: z.boolean().default(true),
});

const updateAccountSchema = createAccountSchema.partial();

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(accounts);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createAccountSchema)(req);
    const account = await prisma.account.create({
      data: { ...body, userId, balance: String(body.balance) },
    });
    return successResponse(account, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(z.object({ id: z.string(), ...updateAccountSchema.shape }))(req);
    const existing = await prisma.account.findFirst({ where: { id: body.id, userId } });
    if (!existing) throw new ApiError(404, "Account not found");
    const { id, ...updateData } = body;
    const account = await prisma.account.update({
      where: { id },
      data: { ...updateData, balance: updateData.balance ? String(updateData.balance) : undefined },
    });
    return successResponse(account);
  } catch (error) {
    return handleApiError(error);
  }
}