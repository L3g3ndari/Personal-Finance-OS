"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

const holdings = [
  { symbol: "VTI", name: "Vanguard Total Stock Market", shares: 150, price: 260.45, change: 1.2, total: 39067.50, type: "Stock" },
  { symbol: "VXUS", name: "Vanguard Total International", shares: 200, price: 58.12, change: -0.5, total: 11624.00, type: "Stock" },
  { symbol: "BND", name: "Vanguard Total Bond Market", shares: 100, price: 72.30, change: 0.1, total: 7230.00, type: "Bond" },
  { symbol: "NVDA", name: "NVIDIA Corporation", shares: 10, price: 1150.00, change: 4.5, total: 11500.00, type: "Stock" },
  { symbol: "AAPL", name: "Apple Inc.", shares: 50, price: 190.20, change: 0.8, total: 9510.00, type: "Stock" },
];

const allocationData = [
  { name: "Stocks", value: 71701.5, color: "#3b82f6" },
  { name: "Bonds", value: 7230, color: "#22c55e" },
];

export default function InvestmentsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
          <p className="text-muted-foreground">Track your portfolio performance and asset allocation.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Rebalance Tool</Button>
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Holding</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 md:grid-cols-3">
             <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Value</p>
                <p className="text-3xl font-bold">$78,931.50</p>
                <p className="text-xs text-green-500 font-bold">+12.4% all time</p>
             </div>
             <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Cost</p>
                <p className="text-3xl font-bold">$70,223.00</p>
             </div>
             <div className="space-y-1">
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Gain/Loss</p>
                <p className="text-3xl font-bold text-green-500">+$8,708.50</p>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="text-right">Market Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holdings.map((h) => (
                <TableRow key={h.symbol}>
                  <TableCell className="font-bold">{h.symbol}</TableCell>
                  <TableCell>{h.name}</TableCell>
                  <TableCell className="text-right">{h.shares}</TableCell>
                  <TableCell className="text-right">${h.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${h.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {h.change >= 0 ? '+' : ''}{h.change}%
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${h.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add Holding</ModalTitle>
          <ModalDescription>Enter investment details to track in your portfolio.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Ticker Symbol">
              <Input placeholder="e.g. VTI" />
            </FormField>
            <FormField label="Asset Type">
               <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Stock/ETF</option>
                  <option>Bond</option>
                  <option>Mutual Fund</option>
                  <option>Crypto</option>
                  <option>Other</option>
               </select>
            </FormField>
          </div>
          <FormField label="Name">
            <Input placeholder="e.g. Vanguard Total Stock Market" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Shares">
              <Input type="number" placeholder="0.00" />
            </FormField>
            <FormField label="Average Cost">
              <Input type="number" placeholder="0.00" />
            </FormField>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Add Holding</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
