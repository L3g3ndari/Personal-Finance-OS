"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";

const bills = [
  { id: 1, name: "Rent", amount: 2100, dueDate: "2024-07-01", status: "Upcoming", category: "Housing" },
  { id: 2, name: "Electric Bill", amount: 85.40, dueDate: "2024-06-15", status: "Due Soon", category: "Utilities" },
  { id: 3, name: "Car Insurance", amount: 120.00, dueDate: "2024-06-20", status: "Upcoming", category: "Transport" },
  { id: 4, name: "Gym Membership", amount: 50.00, dueDate: "2024-06-10", status: "Paid", category: "Health" },
  { id: 5, name: "Internet", amount: 79.99, dueDate: "2024-06-12", status: "Paid", category: "Utilities" },
];

export default function BillsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bills & Payments</h1>
          <p className="text-muted-foreground">Never miss a payment again.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Add Bill</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Monthly Bills</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold">$2,435.39</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-500">$129.99</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining to Pay</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-red-500">$2,305.40</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bills</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.name}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell className="text-right font-bold">${bill.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      bill.status === 'Paid' ? 'success' : 
                      bill.status === 'Due Soon' ? 'danger' : 
                      'info'
                    }>
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {bill.status !== 'Paid' && <Button size="sm" variant="outline">Mark as Paid</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add Recurring Bill</ModalTitle>
          <ModalDescription>Track your monthly commitments.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Bill Name">
            <Input placeholder="e.g. Netflix" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Amount">
              <Input type="number" placeholder="0.00" />
            </FormField>
            <FormField label="Due Date">
              <Input type="date" />
            </FormField>
          </div>
          <FormField label="Category">
             <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Housing</option>
                <option>Utilities</option>
                <option>Subscription</option>
                <option>Transport</option>
                <option>Health</option>
             </select>
          </FormField>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Save Bill</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
