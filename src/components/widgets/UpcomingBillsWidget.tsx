import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bills = [
  { name: "Electric Bill", amount: 85.40, dueDate: "2024-06-15", status: "Due Soon" },
  { name: "Car Insurance", amount: 120.00, dueDate: "2024-06-20", status: "Upcoming" },
  { name: "Rent", amount: 2100.00, dueDate: "2024-07-01", status: "Upcoming" },
];

export function UpcomingBillsWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bills.map((bill) => (
          <div key={bill.name} className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{bill.name}</p>
              <p className="text-xs text-muted-foreground">{bill.dueDate}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">${bill.amount.toFixed(2)}</p>
              <Badge variant={bill.status === "Due Soon" ? "danger" : "info"} className="text-[8px] h-4">
                {bill.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
