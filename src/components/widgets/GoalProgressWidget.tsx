import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const goals = [
  { name: "Emergency Fund", current: 25000, target: 30000, color: "stroke-green-500" },
  { name: "House Downpayment", current: 45000, target: 100000, color: "stroke-blue-500" },
];

export function GoalProgressWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4 justify-around">
        {goals.map((goal) => {
          const percent = (goal.current / goal.target) * 100;
          return (
            <div key={goal.name} className="flex flex-col items-center">
              <div className="relative h-16 w-16">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                  <circle
                    className={`${goal.color} stroke-current`}
                    strokeWidth="8"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - percent / 100)}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                  {Math.round(percent)}%
                </div>
              </div>
              <span className="text-[10px] mt-1 text-muted-foreground">{goal.name}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
