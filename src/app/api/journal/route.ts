import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1).max(200),
  date: z.string().optional(),
  reasoning: z.string().min(1).max(5000),
  expectedOutcome: z.string().max(2000).optional(),
  actualOutcome: z.string().max(2000).optional(),
  reviewDate: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");

    const where: any = { userId };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { reasoning: { contains: search, mode: "insensitive" } },
      ];
    }

    const [entries, total] = await Promise.all([
      prisma.decisionJournal.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.decisionJournal.count({ where }),
    ]);

    return successResponse({ entries, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const body = await parseBody(createSchema)(req);
    const entry = await prisma.decisionJournal.create({
      data: {
        ...body,
        date: body.date ? new Date(body.date) : new Date(),
        reviewDate: body.reviewDate ? new Date(body.reviewDate) : null,
        userId,
      },
    });
    return successResponse(entry, 201);
  } catch (error) {
    return handleApiError(error);
  }
}