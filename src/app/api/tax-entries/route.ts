import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  type: z.string().min(1).max(50),
  amount: z.number(),
  notes: z.string().max(500).optional(),
});

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const year = url.searchParams.get("year");
    const where: any = { userId };
    if (year) where.year = parseInt(year);
    const entries = await prisma.taxEntry.findMany({
      where,
      orderBy: [{ year: "desc" }, { type: "asc" }],
    });
    return successResponse(entries);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const entry = await prisma.taxEntry.create({
      data: { ...body, amount: String(body.amount), userId },
    });
    return successResponse(entry, 201);
  } catch (error) {
    return handleApiError(error);
  }
}