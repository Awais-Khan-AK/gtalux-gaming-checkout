
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Users, 
  Package, 
  TrendingUp,
  ArrowUpRight,
  DollarSign,
  Activity,
  Calendar
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

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

const pieData = [
  { name: "Game Packs", value: 540 },
  { name: "Currency", value: 370 },
  { name: "Exclusive Items", value: 240 },
  { name: "Subscriptions", value: 150 }
];

const COLORS = ['#0FA0CE', '#8B5CF6', '#10B981', '#F59E0B'];

const AdminDashboard = () => {
  const [summary, setSummary] = useState({
    totalSales: 1250,
    totalUsers: 2480,
    totalProducts: 120,
    conversionRate: 3.2,
  });

  const [timeframe, setTimeframe] = useState("weekly");

  // In a real app, you'd fetch this data from an API
  useEffect(() => {
    // Simulate API call
    console.log("Fetching dashboard data...");
  }, []);

  const stats = [
    {
      title: "Total Sales",
      value: `${summary.totalSales} SOL`,
      change: "+12.5%",
      icon: CreditCard,
      description: "vs. previous period",
      color: "text-gaming-primary",
      bgColor: "bg-gaming-primary/10",
    },
    {
      title: "Total Users",
      value: summary.totalUsers.toLocaleString(),
      change: "+8.2%",
      icon: Users,
      description: "vs. previous period",
      color: "text-gaming-secondary",
      bgColor: "bg-gaming-secondary/10",
    },
    {
      title: "Products",
      value: summary.totalProducts.toLocaleString(),
      change: "+3.1%",
      icon: Package,
      description: "vs. previous period",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Conversion Rate",
      value: `${summary.conversionRate}%`,
      change: "+0.8%",
      icon: TrendingUp,
      description: "vs. previous period",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Get a high-level overview of your gaming store performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-gaming-primary to-gaming-secondary hover:opacity-90 transition-opacity">
            <DollarSign className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-green-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">{stat.description}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Monitor your sales trends over time</p>
            </div>
            <Tabs defaultValue="weekly" className="w-auto" onValueChange={setTimeframe}>
              <TabsList className="h-8">
                <TabsTrigger value="daily" className="text-xs px-3">Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs px-3">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs px-3">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
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
      
        {/* Product Sales Distribution */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Sales Distribution</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Product category breakdown</p>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Transactions */}
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <p className="text-sm text-gray-500 mt-1">Latest purchase activities</p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="bg-white hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                        {`U${i + 1}`}
                      </div>
                      <span>User{i + 1}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">{(Math.random() * 10).toFixed(2)} SOL</td>
                    <td className="px-6 py-4">Game Pack {i + 1}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date().toLocaleDateString()}</td>
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
