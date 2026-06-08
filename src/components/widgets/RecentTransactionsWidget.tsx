import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const transactions = [
  { id: 1, desc: "Grocery Store", amount: -85.20, category: "Food" },
  { id: 2, desc: "Salary", amount: 3500.00, category: "Income" },
  { id: 3, desc: "Gas Station", amount: -45.00, category: "Transport" },
  { id: 4, desc: "Netflix", amount: -19.99, category: "Entertainment" },
  { id: 5, desc: "Utility Bill", amount: -150.00, category: "Utilities" },
];

export function RecentTransactionsWidget() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="py-2">
                  <p className="text-xs font-medium">{tx.desc}</p>
                  <p className="text-[10px] text-muted-foreground">{tx.category}</p>
                </TableCell>
                <TableCell className={`text-right py-2 text-xs font-bold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  {tx.amount < 0 ? "" : "+"}${Math.abs(tx.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
