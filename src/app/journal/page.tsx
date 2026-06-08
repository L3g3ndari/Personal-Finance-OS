"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalFooter } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";

const journalEntries = [
  { 
    id: 1, 
    date: "2024-06-01", 
    title: "Increased 401(k) contribution to 15%", 
    category: "Retirement",
    reasoning: "Received a 5% raise, decided to allocate the entire raise to retirement savings to avoid lifestyle creep. This puts me on track for my goal of $1M by age 55.",
    outcome: "Pending",
    tags: ["retirement", "savings", "investment"]
  },
  { 
    id: 2, 
    date: "2024-05-15", 
    title: "Bought $5,000 of NVDA", 
    category: "Investment",
    reasoning: "Strong believe in the long-term AI growth story. Financials look solid despite high valuation.",
    outcome: "Positive",
    tags: ["stocks", "tech", "AI"]
  },
  { 
    id: 3, 
    date: "2024-04-10", 
    title: "Refinanced Mortgage", 
    category: "Housing",
    reasoning: "Found a rate 0.75% lower than current. Break-even point is 14 months, and I plan to stay in the house for at least 5 years.",
    outcome: "Successful",
    tags: ["debt", "mortgage", "real-estate"]
  },
];

export default function JournalPage() {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Decision Journal</h1>
          <p className="text-muted-foreground">Log the "why" behind your major financial moves.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>+ New Entry</Button>
      </div>

      <div className="flex items-center gap-4">
        <SearchInput placeholder="Search decisions..." className="max-w-md" />
      </div>

      <div className="space-y-6">
        {journalEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{entry.date} • {entry.category}</div>
                  <CardTitle className="text-xl">{entry.title}</CardTitle>
                </div>
                <Badge variant={
                  entry.outcome === 'Positive' || entry.outcome === 'Successful' 
                    ? 'success' 
                    : 'warning'
                }>
                  {entry.outcome}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold mb-1 uppercase tracking-widest text-muted-foreground">Reasoning</h4>
                  <p className="text-sm leading-relaxed">{entry.reasoning}</p>
                </div>
                <div className="flex gap-2">
                  {entry.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>New Journal Entry</ModalTitle>
          <ModalDescription>Document your financial thinking for future review.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <FormField label="Title">
            <Input placeholder="e.g. Started Roth IRA" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
             <FormField label="Type">
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                   <option>Investment</option>
                   <option>Retirement</option>
                   <option>Debt</option>
                   <option>Purchase</option>
                   <option>Other</option>
                </select>
             </FormField>
             <FormField label="Date">
               <Input type="date" />
             </FormField>
          </div>
          <FormField label="The Decision">
             <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="What did you decide to do?" />
          </FormField>
          <FormField label="Reasoning & Expected Outcome">
             <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Why? What do you expect will happen?" />
          </FormField>
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsAddModalOpen(false)}>Save Entry</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
