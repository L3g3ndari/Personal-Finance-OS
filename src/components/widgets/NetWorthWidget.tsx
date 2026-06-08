"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { date: "2024-01", value: 110000 },
  { date: "2024-02", value: 112000 },
  { date: "2024-03", value: 108000 },
  { date: "2024-04", value: 115000 },
  { date: "2024-05", value: 122000 },
  { date: "2024-06", value: 128430 },
];

export function NetWorthWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
        <span className="text-2xl">💰</span>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$128,430.00</div>
        <p className="text-xs text-green-500">+5.2% from last month</p>
        <div className="h-[80px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorNetWorth)"
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded p-1 text-[10px]">
                        ${payload[0].value.toLocaleString()}
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
