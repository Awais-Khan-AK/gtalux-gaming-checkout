
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search, Filter } from "lucide-react";

// Mock transaction data
const transactionData = Array.from({ length: 20 }, (_, i) => ({
  id: `TX${1000 + i}`,
  user: `User${i + 1}`,
  email: `user${i + 1}@example.com`,
  amount: (Math.random() * 10).toFixed(2),
  product: `Game Pack ${i % 5 + 1}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  status: i % 4 === 0 ? "Completed" : i % 4 === 1 ? "Pending" : i % 4 === 2 ? "Failed" : "Processing",
}));

const AdminTransactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  
  const filteredTransactions = transactionData.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.product.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = 
      filter === "all" || 
      transaction.status.toLowerCase() === filter.toLowerCase();
      
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button className="bg-gaming-primary hover:bg-gaming-primary/90">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 min-w-[200px]">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.amount} SOL</TableCell>
                  <TableCell>{transaction.product}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "Completed" ? "bg-green-100 text-green-800" : 
                      transaction.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                      transaction.status === "Failed" ? "bg-red-100 text-red-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
