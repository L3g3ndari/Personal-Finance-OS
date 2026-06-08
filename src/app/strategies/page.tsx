"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const strategies = [
  { id: 1, name: "Debt Snowball", description: "Pay off smallest debts first to build psychological momentum.", status: "Active", impact: "High" },
  { id: 2, name: "Tax-Loss Harvesting", description: "Sell underperforming assets to offset capital gains and reduce taxes.", status: "Paused", impact: "Medium" },
  { id: 3, name: "Backdoor Roth IRA", description: "A method for high-income earners to contribute to a Roth IRA.", status: "Upcoming", impact: "Very High" },
];

export default function StrategiesPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Strategy Center</h1>
        <p className="text-muted-foreground">Advanced financial strategies to optimize your wealth growth.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {strategies.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{s.name}</CardTitle>
                <Badge variant={s.status === 'Active' ? 'success' : 'secondary'}>{s.status}</Badge>
              </div>
              <CardDescription className="pt-2">{s.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Impact: {s.impact}</span>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Comparison</CardTitle>
          <CardDescription>How different strategies affect your 20-year net worth.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center border rounded-xl border-dashed text-muted-foreground italic text-xs">
            Multi-line Chart placeholder: Scenario Comparison
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
