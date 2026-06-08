import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError, ApiError } from "@/lib/api-utils";

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const q = url.searchParams.get("q") || "";

    if (q.length < 2) {
      return successResponse([]);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        account: { userId },
        OR: [
          { description: { contains: q, mode: "insensitive" } },
          { payee: { contains: q, mode: "insensitive" } },
        ],
      },
      select: { id: true, description: true, payee: true, amount: true, date: true, accountId: true },
      orderBy: { date: "desc" },
      take: 20,
    });

    return successResponse(transactions);
  } catch (error) {
    return handleApiError(error);
  }
}