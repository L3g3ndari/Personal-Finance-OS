"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const taxBrackets = [
  { bracket: "10%", income: "Up to $11,600", color: "bg-blue-500/20" },
  { bracket: "12%", income: "$11,601 – $47,150", color: "bg-blue-500/40" },
  { bracket: "22%", income: "$47,151 – $100,525", color: "bg-blue-500/60" },
];

export default function TaxPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tax Center</h1>
        <p className="text-muted-foreground">Track your tax liability, brackets, and optimization strategies.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Tax Due</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold">$12,450</div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Tax Paid YTD</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold text-green-500">$9,800</div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Effective Rate</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold">14.2%</div>
            </CardContent>
         </Card>
         <Card>
            <CardHeader className="pb-2">
               <CardTitle className="text-sm font-medium text-muted-foreground">Top Marginal Bracket</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-bold">22%</div>
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card>
            <CardHeader>
               <CardTitle>Income Brackets</CardTitle>
               <CardDescription>2024 Federal Tax Brackets (Single)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {taxBrackets.map((tb) => (
                  <div key={tb.bracket} className="flex items-center justify-between p-3 rounded-lg border">
                     <div className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${tb.color}`} />
                        <span className="font-bold">{tb.bracket}</span>
                     </div>
                     <span className="text-sm text-muted-foreground">{tb.income}</span>
                  </div>
               ))}
               <p className="text-[10px] text-muted-foreground text-center">Your estimated income puts you in the 22% bracket.</p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader>
               <CardTitle>Taxable vs Tax-Advantaged</CardTitle>
               <CardDescription>Asset location strategy.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="h-[200px] w-full flex items-center justify-center border rounded-xl border-dashed text-muted-foreground italic text-xs">
                  Pie Chart: Asset Tax Status
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
