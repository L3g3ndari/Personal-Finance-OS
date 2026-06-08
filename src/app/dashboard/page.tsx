import { NetWorthWidget } from "@/components/widgets/NetWorthWidget";
import { CashFlowWidget } from "@/components/widgets/CashFlowWidget";
import { BudgetStatusWidget } from "@/components/widgets/BudgetStatusWidget";
import { UpcomingBillsWidget } from "@/components/widgets/UpcomingBillsWidget";
import { RecentTransactionsWidget } from "@/components/widgets/RecentTransactionsWidget";
import { GoalProgressWidget } from "@/components/widgets/GoalProgressWidget";
import { InvestmentSummaryWidget } from "@/components/widgets/InvestmentSummaryWidget";
import { HealthScoreWidget } from "@/components/widgets/HealthScoreWidget";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your financial command center.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <NetWorthWidget />
        <CashFlowWidget />
        <HealthScoreWidget />
        
        <BudgetStatusWidget />
        <GoalProgressWidget />
        <InvestmentSummaryWidget />
        <UpcomingBillsWidget />
        
        <RecentTransactionsWidget />
        
        {/* Fillers for grid layout if needed */}
        <div className="lg:col-span-3 h-full">
           <RecentTransactionsWidget />
        </div>
      </div>
    </div>
  );
}
