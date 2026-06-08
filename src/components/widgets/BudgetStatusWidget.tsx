import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const budgets = [
  { category: "Housing", spent: 2100, limit: 2200 },
  { category: "Food", spent: 650, limit: 800 },
  { category: "Transport", spent: 450, limit: 400 },
];

export function BudgetStatusWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.map((b) => {
          const percent = Math.min((b.spent / b.limit) * 100, 100);
          const isOver = b.spent > b.limit;
          return (
            <div key={b.category} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{b.category}</span>
                <span className={isOver ? "text-red-500 font-bold" : ""}>
                  ${b.spent} / ${b.limit}
                </span>
              </div>
              <Progress value={percent} className={isOver ? "bg-red-500/20" : ""} />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
