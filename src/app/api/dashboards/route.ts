import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(100),
  isDefault: z.boolean().default(false),
});

export async function GET() {
  try {
    const { userId } = await getAuthSession();
    const dashboards = await prisma.dashboard.findMany({
      where: { userId },
      include: { widgets: { orderBy: [{ y: "asc" }, { x: "asc" }] } },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    return successResponse(dashboards);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    if (body.isDefault) {
      await prisma.dashboard.updateMany({ where: { userId }, data: { isDefault: false } });
    }
    const dashboard = await prisma.dashboard.create({
      data: { ...body, userId },
      include: { widgets: true },
    });
    return successResponse(dashboard, 201);
  } catch (error) {
    return handleApiError(error);
  }
}