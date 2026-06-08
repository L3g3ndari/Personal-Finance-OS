"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";

const budgets = [
  { id: 1, name: "Housing", budgeted: 2200, spent: 2100, color: "bg-blue-500" },
  { id: 2, name: "Food & Dining", budgeted: 800, spent: 650, color: "bg-green-500" },
  { id: 3, name: "Transportation", budgeted: 400, spent: 450, color: "bg-red-500" },
  { id: 4, name: "Entertainment", budgeted: 300, spent: 120, color: "bg-yellow-500" },
  { id: 5, name: "Utilities", budgeted: 250, spent: 180, color: "bg-purple-500" },
  { id: 6, name: "Shopping", budgeted: 500, spent: 580, color: "bg-red-500" },
];

export default function BudgetsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">Track your spending against your goals.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Monthly View</Button>
          <Button onClick={() => setIsAddModalOpen(true)}>+ New Budget</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percent = Math.min((budget.spent / budget.budgeted) * 100, 100);
          const isOver = budget.spent > budget.budgeted;
          const isWarning = !isOver && percent > 85;
          
          let progressColor = "bg-primary";
          if (isOver) progressColor = "bg-red-500";
          else if (isWarning) progressColor = "bg-yellow-500";
          else progressColor = "bg-green-500";

          return (
            <Card key={budget.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{budget.name}</CardTitle>
                <div className="text-sm font-medium">
                  ${budget.spent} / ${budget.budgeted}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                   <div 
                    className={`h-full transition-all ${progressColor}`} 
                    style={{ width: `${percent}%` }}
                   />
                </div>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{percent.toFixed(0)}% used</span>
                  <span className={isOver ? "text-red-500 font-bold" : ""}>
                    ${Math.abs(budget.budgeted - budget.spent)} {isOver ? "over" : "remaining"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budget vs Actual (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground italic">
            Bar Chart placeholder: Budget vs Actual comparison
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Create New Budget</ModalTitle>
          <ModalDescription>Set a monthly limit for a spending category.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Category Name">
            <Input placeholder="e.g. Groceries" />
          </FormField>
          <FormField label="Monthly Limit">
            <Input type="number" placeholder="0.00" />
          </FormField>
          <FormField label="Icon (Optional)">
            <Input placeholder="e.g. 🍎" />
          </FormField>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Create Budget</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
