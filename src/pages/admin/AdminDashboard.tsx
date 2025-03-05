
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Users, 
  Package, 
  TrendingUp 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for the chart
const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 500 },
  { name: "Apr", sales: 280 },
  { name: "May", sales: 590 },
  { name: "Jun", sales: 430 },
  { name: "Jul", sales: 350 },
];

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalSales: 1250,
    totalUsers: 2480,
    totalProducts: 120,
    conversionRate: 3.2,
  });

  // In a real app, you'd fetch this data from an API
  useEffect(() => {
    // Simulate API call
    console.log("Fetching dashboard data...");
  }, []);

  const stats = [
    {
      title: "Total Sales",
      value: `${summary.totalSales} SOL`,
      icon: CreditCard,
      color: "text-gaming-primary",
      bgColor: "bg-gaming-primary/10",
    },
    {
      title: "Total Users",
      value: summary.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-gaming-secondary",
      bgColor: "bg-gaming-secondary/10",
    },
    {
      title: "Products",
      value: summary.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Conversion Rate",
      value: `${summary.conversionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Sales Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0FA0CE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0FA0CE" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    border: "1px solid #ccc",
                    borderRadius: "8px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#0FA0CE" 
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="bg-white border-b">
                    <td className="px-6 py-4">User{i + 1}</td>
                    <td className="px-6 py-4">{(Math.random() * 10).toFixed(2)} SOL</td>
                    <td className="px-6 py-4">Game Pack {i + 1}</td>
                    <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        i % 3 === 0 ? "bg-green-100 text-green-800" : 
                        i % 3 === 1 ? "bg-yellow-100 text-yellow-800" : 
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Processing"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
