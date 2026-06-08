import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { successResponse, handleApiError, parseBody, ApiError } from "@/lib/api-utils";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export async function POST(req: Request) {
  try {
    const body = await parseBody(registerSchema)(req);

    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existing) {
      throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return successResponse(user, 201);
  } catch (error) {
    return handleApiError(error);
  }
}