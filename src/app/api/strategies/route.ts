import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.string().min(1).max(50),
  config: z.any().optional(),
  milestones: z.array(z.object({
    name: z.string().min(1).max(200),
    targetDate: z.string().optional(),
  })).optional(),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const strategies = await prisma.strategy.findMany({
      where: { userId },
      include: { milestones: { orderBy: { targetDate: "asc" } } },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(strategies);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const { milestones, ...strategyData } = body;
    const strategy = await prisma.strategy.create({
      data: {
        ...strategyData,
        config: strategyData.config || {},
        userId,
        milestones: milestones?.length
          ? { create: milestones.map((m) => ({
              name: m.name,
              targetDate: m.targetDate ? new Date(m.targetDate) : null,
            })) }
          : undefined,
      },
      include: { milestones: true },
    });
    return successResponse(strategy, 201);
  } catch (error) {
    return handleApiError(error);
  }
}