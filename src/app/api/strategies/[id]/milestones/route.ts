import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(200),
  targetDate: z.string().optional(),
});

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const strategy = await prisma.strategy.findFirst({ where: { id, userId } });
    if (!strategy) throw new ApiError(404, "Strategy not found");
    const body = await parseBody(createSchema)(req);
    const milestone = await prisma.strategyMilestone.create({
      data: {
        strategyId: id,
        name: body.name,
        targetDate: body.targetDate ? new Date(body.targetDate) : null,
      },
    });
    return successResponse(milestone, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await getAuthSession();
    const { id } = await params;
    const strategy = await prisma.strategy.findFirst({ where: { id, userId } });
    if (!strategy) throw new ApiError(404, "Strategy not found");
    const milestones = await prisma.strategyMilestone.findMany({
      where: { strategyId: id },
      orderBy: { targetDate: "asc" },
    });
    return successResponse(milestones);
  } catch (error) {
    return handleApiError(error);
  }
}