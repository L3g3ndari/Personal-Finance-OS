import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  targetAmount: z.number(),
  currentAmount: z.number().default(0),
  deadline: z.string().optional(),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const goals = await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(goals);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const goal = await prisma.goal.create({
      data: {
        ...body,
        targetAmount: String(body.targetAmount),
        currentAmount: String(body.currentAmount),
        deadline: body.deadline ? new Date(body.deadline) : null,
        userId,
      },
    });
    return successResponse(goal, 201);
  } catch (error) {
    return handleApiError(error);
  }
}