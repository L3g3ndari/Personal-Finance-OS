import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, parseBody } from "@/lib/api-utils";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(50),
});

export async function GET() {
  try {
    const tags = await prisma.transactionTag.findMany({
      orderBy: { name: "asc" },
    });
    return successResponse(tags);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await parseBody(createSchema)(req);
    const tag = await prisma.transactionTag.create({ data: body });
    return successResponse(tag, 201);
  } catch (error) {
    return handleApiError(error);
  }
}