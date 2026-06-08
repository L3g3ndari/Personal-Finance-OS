import { prisma } from "@/lib/prisma";
import { getAuthSession, successResponse, handleApiError } from "@/lib/api-utils";

export async function GET(req: Request) {
  try {
    const { userId } = await getAuthSession();
    const url = new URL(req.url);
    const type = url.searchParams.get("type") || "spending"; // spending, budget, networth, investment
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    const year = url.searchParams.get("year");

    const dateFilter: any = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate);
    if (!startDate && !endDate && year) {
      const y = parseInt(year);
      dateFilter.gte = new Date(y, 0, 1);
      dateFilter.lte = new Date(y, 11, 31);
    }

    let data: any = {};

    switch (type) {
      case "spending": {
        const transactions = await prisma.transaction.findMany({
          where: {
            account: { userId },
            ...(Object.keys(dateFilter).length ? { date: dateFilter } : {}),
          },
          include: { category: true },
        });
        data = transactions;
        break;
      }
      case "budget": {
        const budgets = await prisma.budget.findMany({
          where: { userId },
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        });
        data = budgets;
        break;
      }
      case "networth": {
        const accounts = await prisma.account.findMany({
          where: { userId, isActive: true },
          select: { id: true, name: true, type: true, balance: true, institution: true },
        });
        const total = accounts.reduce((sum, a) => sum + Number(a.balance), 0);
        data = { accounts, totalNetWorth: total };
        break;
      }
      case "investment": {
        const investments = await prisma.investment.findMany({
          where: { account: { userId } },
          include: { account: { select: { name: true, type: true } } },
        });
        const totalValue = investments.reduce((sum, i) => {
          const price = i.currentPrice ? Number(i.currentPrice) : 0;
          return sum + Number(i.quantity) * price;
        }, 0);
        data = { investments, totalValue };
        break;
      }
      case "cashflow": {
        const entries = await prisma.cashFlowEntry.findMany({
          where: { userId },
          orderBy: { date: "asc" },
        });
        const totalIncome = entries.reduce((s, e) => s + Number(e.income), 0);
        const totalExpenses = entries.reduce((s, e) => s + Number(e.expenses), 0);
        const totalSavings = entries.reduce((s, e) => s + Number(e.savings), 0);
        data = { entries, totalIncome, totalExpenses, totalSavings, savingsRate: totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0 };
        break;
      }
      case "category-summary": {
        const transactions = await prisma.transaction.findMany({
          where: {
            account: { userId },
            ...(Object.keys(dateFilter).length ? { date: dateFilter } : {}),
          },
          include: { category: true },
        });
        const summary: Record<string, { total: number; count: number; type: string }> = {};
        for (const t of transactions) {
          const catName = t.category?.name || "Uncategorized";
          if (!summary[catName]) summary[catName] = { total: 0, count: 0, type: t.category?.type || "EXPENSE" };
          summary[catName].total += Number(t.amount);
          summary[catName].count++;
        }
        data = { categories: summary };
        break;
      }
      default:
        data = { error: `Unknown report type: ${type}` };
    }

    return successResponse(data);
  } catch (error) {
    return handleApiError(error);
  }
}