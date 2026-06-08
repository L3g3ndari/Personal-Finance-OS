"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";

const goals = [
  { id: 1, name: "Emergency Fund", target: 30000, current: 25000, deadline: "2024-12-31", color: "text-green-500" },
  { id: 2, name: "House Down Payment", target: 100000, current: 45000, deadline: "2026-06-01", color: "text-blue-500" },
  { id: 3, name: "New Car", target: 40000, current: 12000, deadline: "2025-03-15", color: "text-yellow-500" },
  { id: 4, name: "Vacation Fund", target: 5000, current: 4200, deadline: "2024-08-01", color: "text-purple-500" },
];

export default function GoalsPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">Plan and track your progress toward major milestones.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ New Goal</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {goals.map((goal) => {
          const percent = (goal.current / goal.target) * 100;
          return (
            <Card key={goal.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="text-muted stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent" />
                      <circle
                        className={`${goal.color.replace('text', 'stroke')} stroke-current`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 * (1 - percent / 100)}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {Math.round(percent)}%
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                       <h3 className="text-xl font-bold">{goal.name}</h3>
                       <p className="text-xs text-muted-foreground">Due: {goal.deadline}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                       At current rate, reaches target by <span className="font-bold text-foreground">Sep 2024</span>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>New Financial Goal</ModalTitle>
          <ModalDescription>Define a new milestone for your financial journey.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Goal Name">
            <Input placeholder="e.g. Wedding Fund" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Target Amount">
               <Input type="number" placeholder="0.00" />
             </FormField>
             <FormField label="Deadline">
               <Input type="date" />
             </FormField>
          </div>
          <FormField label="Initial Contribution">
            <Input type="number" placeholder="0.00" />
          </FormField>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Create Goal</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
