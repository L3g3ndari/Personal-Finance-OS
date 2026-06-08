"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function HealthPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Health</h1>
        <p className="text-muted-foreground">A holistic view of your financial well-being based on key benchmarks.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative h-48 w-48 flex items-center justify-center">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              className="text-muted stroke-current"
              strokeWidth="10"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
            ></circle>
            <circle
              className="text-green-500 stroke-current"
              strokeWidth="10"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 * (1 - 0.85)}
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-bold">85</span>
            <Badge variant="success">Excellent</Badge>
          </div>
        </div>
        
        <div className="flex-1 grid gap-4 md:grid-cols-2 w-full">
           <Card>
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
                 <CardDescription>Target: 6 months of expenses</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold">4.2 months</span>
                    <span className="text-xs text-yellow-500 font-bold">70%</span>
                 </div>
                 <Progress value={70} className="bg-yellow-500/20" />
              </CardContent>
           </Card>
           <Card>
              <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Debt-to-Income</CardTitle>
                 <CardDescription>Target: Below 30%</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-2xl font-bold">18%</span>
                    <span className="text-xs text-green-500 font-bold">92%</span>
                 </div>
                 <Progress value={92} />
              </CardContent>
           </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
           <CardHeader>
              <CardTitle className="text-lg">Liquidity</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Cash on Hand</span>
                    <span>$12,234</span>
                 </div>
                 <Progress value={95} />
              </div>
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Savings Access</span>
                    <span>High</span>
                 </div>
                 <Progress value={100} />
              </div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader>
              <CardTitle className="text-lg">Investment Health</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Diversification</span>
                    <span>Medium</span>
                 </div>
                 <Progress value={65} className="bg-yellow-500/20" />
              </div>
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Risk Profile</span>
                    <span>Balanced</span>
                 </div>
                 <Progress value={85} />
              </div>
           </CardContent>
        </Card>
        <Card>
           <CardHeader>
              <CardTitle className="text-lg">Future Security</CardTitle>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Retirement Progress</span>
                    <span>On Track</span>
                 </div>
                 <Progress value={80} />
              </div>
              <div className="space-y-1">
                 <div className="flex justify-between text-xs">
                    <span>Insurance Coverage</span>
                    <span>Good</span>
                 </div>
                 <Progress value={90} />
              </div>
           </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Priority Actions</CardTitle>
          <CardDescription>Personalized recommendations to improve your score.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-4 rounded-xl border bg-accent/30">
              <span className="text-2xl">📈</span>
              <div>
                <p className="font-bold text-sm">Diversify International Stock Exposure</p>
                <p className="text-sm text-muted-foreground">Your portfolio is 90% US-based. Increasing international exposure could reduce risk.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">Learn More</Button>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-xl border bg-accent/30">
              <span className="text-2xl">🏦</span>
              <div>
                <p className="font-bold text-sm">Top off Emergency Fund</p>
                <p className="text-sm text-muted-foreground">You're $5,000 away from your 6-month target. Consider allocating more from your monthly surplus.</p>
              </div>
              <Button size="sm" variant="outline" className="ml-auto">Set Goal</Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
