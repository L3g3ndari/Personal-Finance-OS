import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.string().min(1),
  parameters: z.any(),
  results: z.any(),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const forecasts = await prisma.forecast.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return successResponse(forecasts);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const forecast = await prisma.forecast.create({
      data: { ...body, userId },
    });
    return successResponse(forecast, 201);
  } catch (error) {
    return handleApiError(error);
  }
}