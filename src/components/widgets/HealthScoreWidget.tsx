import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HealthScoreWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Financial Health</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-2">
        <div className="relative h-24 w-24">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
            <circle
              className="text-green-500 stroke-current"
              strokeWidth="8"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 * (1 - 0.85)}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">85</span>
          </div>
        </div>
        <p className="text-[10px] mt-2 font-medium text-green-500 uppercase tracking-wider">Excellent</p>
      </CardContent>
    </Card>
  );
}
