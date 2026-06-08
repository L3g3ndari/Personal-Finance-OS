import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  score: z.number().min(0).max(100),
  details: z.any().optional(),
});

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const scores = await prisma.healthScore.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: Math.min(limit, 100),
    });
    return successResponse(scores);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const score = await prisma.healthScore.create({
      data: {
        score: body.score,
        details: body.details || {},
        userId,
      },
    });
    return successResponse(score, 201);
  } catch (error) {
    return handleApiError(error);
  }
}