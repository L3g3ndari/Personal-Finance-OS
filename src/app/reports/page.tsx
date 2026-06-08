"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const spendingData = [
  { category: "Housing", amount: 2100 },
  { category: "Food", amount: 850 },
  { category: "Transport", amount: 480 },
  { category: "Utilities", amount: 320 },
  { category: "Fun", amount: 450 },
  { category: "Other", amount: 210 },
];

export default function ReportsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Deep dive into your financial data.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline">Download PDF</Button>
           <Button variant="outline">Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card>
            <CardHeader>
               <CardTitle>Spending by Category</CardTitle>
               <CardDescription>Current month breakdown.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={spendingData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="category" type="category" width={100} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Net Worth History</CardTitle>
               <CardDescription>Last 12 months growth.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[300px] w-full flex items-center justify-center border rounded-lg border-dashed text-muted-foreground italic text-xs">
                  Area Chart placeholder: Monthly Net Worth
               </div>
            </CardContent>
         </Card>
      </div>

      <Card>
         <CardHeader>
            <CardTitle>Saved Reports</CardTitle>
         </CardHeader>
         <CardContent className="p-0">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Report Name</TableHead>
                     <TableHead>Period</TableHead>
                     <TableHead>Created</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell className="font-medium">Annual Tax Summary</TableCell>
                     <TableCell>FY 2023</TableCell>
                     <TableCell>2024-01-15</TableCell>
                     <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">Investment Q1 Review</TableCell>
                     <TableCell>2024 Q1</TableCell>
                     <TableCell>2024-04-02</TableCell>
                     <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </CardContent>
      </Card>
    </div>
  );
}
