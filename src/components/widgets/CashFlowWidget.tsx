"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { month: "Jan", income: 7500, expenses: 4200 },
  { month: "Feb", income: 7500, expenses: 3800 },
  { month: "Mar", income: 8200, expenses: 4500 },
  { month: "Apr", income: 7800, expenses: 4100 },
  { month: "May", income: 8500, expenses: 4300 },
  { month: "Jun", income: 8250, expenses: 4120 },
];

export function CashFlowWidget() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
