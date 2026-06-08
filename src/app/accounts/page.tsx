"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";

const accounts = [
  { id: 1, name: "Chase Checking", type: "Checking", balance: 5430.50, institution: "Chase" },
  { id: 2, name: "Amex Gold", type: "Credit Card", balance: -1240.20, institution: "American Express" },
  { id: 3, name: "Vanguard Brokerage", type: "Investment", balance: 85200.00, institution: "Vanguard" },
  { id: 4, name: "Marcus Savings", type: "Savings", balance: 25000.00, institution: "Goldman Sachs" },
  { id: 5, name: "Coinbase", type: "Crypto", balance: 14040.30, institution: "Coinbase" },
];

export default function AccountsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground">Manage and track all your financial accounts.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ Add Account</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Institution</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.institution}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{account.type}</Badge>
                  </TableCell>
                  <TableCell className={`text-right ${account.balance < 0 ? 'text-red-500' : ''}`}>
                    ${account.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add New Account</ModalTitle>
          <ModalDescription>Enter the details of your new financial account.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Account Name">
            <Input placeholder="e.g. Main Checking" />
          </FormField>
          <FormField label="Institution">
            <Input placeholder="e.g. Chase" />
          </FormField>
          <FormField label="Account Type">
             <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Checking</option>
                <option>Savings</option>
                <option>Credit Card</option>
                <option>Investment</option>
                <option>Crypto</option>
             </select>
          </FormField>
          <FormField label="Initial Balance">
            <Input type="number" placeholder="0.00" />
          </FormField>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Add Account</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
