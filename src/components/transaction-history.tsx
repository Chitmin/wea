"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Transaction {
  date: string;
  id: number;
  to: string;
  type: string;
  amount: number;
}

export default function TransactionHistory({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <>
      <h1 className="text-lg text-center">Transaction History</h1>
      <Table>
        <TableCaption className="sr-only">Transaction History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reference ID</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Transaction Type</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tr) => (
            <TableRow key={tr.id}>
              <TableCell className="font-medium">{tr.date}</TableCell>
              <TableCell>{tr.id}</TableCell>
              <TableCell>{tr.to}</TableCell>
              <TableCell>{tr.type}</TableCell>
              <TableCell className="text-right">{tr.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
