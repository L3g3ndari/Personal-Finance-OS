"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { SearchInput } from "@/components/ui/search-input";

const transactions = [
  { id: 1, date: "2024-06-05", description: "Grocery Store", category: "Food", account: "Chase Checking", amount: -85.20 },
  { id: 2, date: "2024-06-04", description: "Salary Paycheck", category: "Income", account: "Chase Checking", amount: 3500.00 },
  { id: 3, date: "2024-06-03", description: "Gas Station", category: "Transport", account: "Amex Gold", amount: -45.00 },
  { id: 4, date: "2024-06-02", description: "Netflix Subscription", category: "Entertainment", account: "Amex Gold", amount: -19.99 },
  { id: 5, date: "2024-06-01", description: "Rent Payment", category: "Housing", account: "Chase Checking", amount: -2100.00 },
  { id: 6, date: "2024-05-30", description: "Restaurant Dinner", category: "Food", account: "Amex Gold", amount: -120.50 },
  { id: 7, date: "2024-05-28", description: "Utility Bill", category: "Utilities", account: "Chase Checking", amount: -150.00 },
];

export default function TransactionsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your recent financial activity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export CSV</Button>
          <Button onClick={() => setIsAddModalOpen(true)}>+ Add Transaction</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-2 max-w-sm">
              <SearchInput placeholder="Search transactions..." />
            </div>
            <div className="flex items-center gap-2">
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option>All Categories</option>
                <option>Food</option>
                <option>Income</option>
                <option>Transport</option>
              </select>
              <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option>All Accounts</option>
                <option>Chase Checking</option>
                <option>Amex Gold</option>
              </select>
              <Button size="sm" variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="font-medium">{tx.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tx.category}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.account}</TableCell>
                  <TableCell className={`text-right font-bold ${tx.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">Showing 7 of 1,245 transactions</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add Transaction</ModalTitle>
          <ModalDescription>Enter the details of the new transaction.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Description">
            <Input placeholder="e.g. Starbucks" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Amount">
              <Input type="number" placeholder="0.00" />
            </FormField>
            <FormField label="Date">
              <Input type="date" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Category">
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Food</option>
                <option>Transport</option>
                <option>Income</option>
                <option>Housing</option>
              </select>
            </FormField>
            <FormField label="Account">
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Chase Checking</option>
                <option>Amex Gold</option>
              </select>
            </FormField>
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Save Transaction</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
