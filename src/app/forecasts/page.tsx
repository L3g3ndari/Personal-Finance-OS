"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { year: 0, current: 128430, aggressive: 128430 },
  { year: 5, current: 210000, aggressive: 250000 },
  { year: 10, current: 350000, aggressive: 480000 },
  { year: 15, current: 580000, aggressive: 850000 },
  { year: 20, current: 950000, aggressive: 1600000 },
  { year: 25, current: 1600000, aggressive: 3200000 },
  { year: 30, current: 2800000, aggressive: 6400000 },
];

export default function ForecastsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forecasts</h1>
          <p className="text-muted-foreground">Visualize your financial future under different scenarios.</p>
        </div>
        <Button>Edit Assumptions</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
         <Card className="lg:col-span-3">
            <CardHeader>
               <CardTitle>Net Worth Projection</CardTitle>
               <CardDescription>Estimated growth over the next 30 years.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[400px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data}>
                        <XAxis dataKey="year" label={{ value: 'Years from now', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                        <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                        <Legend verticalAlign="top" height={36}/>
                        <Area type="monotone" dataKey="current" name="Baseline Plan" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                        <Area type="monotone" dataKey="aggressive" name="Aggressive Saving" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <div className="space-y-6">
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Projected FIRE Age</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-green-500">48</div>
                  <p className="text-xs text-muted-foreground">Current path: 54</p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Passive Income</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold">$12,400</div>
                  <p className="text-xs text-muted-foreground">In 20 years (inflation adjusted)</p>
               </CardContent>
            </Card>
            <Card>
               <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Confidence Score</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-3xl font-bold text-blue-500">92%</div>
                  <p className="text-xs text-muted-foreground">Monte Carlo Simulation</p>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
