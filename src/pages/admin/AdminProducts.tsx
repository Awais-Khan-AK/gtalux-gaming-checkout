
import { useState, Fragment } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter, 
  ArrowUpDown,
  Grid,
  List
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock products data
const productsData = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Game Pack ${i + 1}`,
  description: `This is a digital game pack containing premium in-game items and bonuses.`,
  price: (Math.random() * 10 + 0.1).toFixed(2),
  inventory: Math.floor(Math.random() * 100),
  status: i % 3 === 0 ? "active" : i % 3 === 1 ? "draft" : "archived",
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  image: `https://placehold.co/400x225?text=Game${i+1}`,
}));

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "price-high" | "price-low">("newest");
  
  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl font-bold">Products</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-gaming-primary to-gaming-secondary hover:opacity-90 transition-opacity">
                  <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" placeholder="Product name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="price">Price (SOL)</label>
                    <Input id="price" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description">Description</label>
                    <Input id="description" placeholder="Product description" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="inventory">Inventory</label>
                    <Input id="inventory" type="number" placeholder="0" />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Draft</DropdownMenuItem>
                    <DropdownMenuItem>Archived</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-9">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy("newest")}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                      Oldest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                      Price: Low to High
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <div className="border rounded-md p-1 flex">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm" 
                    className={`h-8 ${viewMode === "grid" ? "bg-gray-100 hover:bg-gray-200" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    size="sm" 
                    className={`h-8 ${viewMode === "list" ? "bg-gray-100 hover:bg-gray-200" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Display */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map(product => (
                      <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                        <div className="aspect-video bg-gray-100 relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover" 
                          />
                          <Badge 
                            className={`absolute top-2 right-2 ${getStatusColor(product.status)}`}
                          >
                            {product.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <span className="font-bold text-gaming-primary">{product.price} SOL</span>
                            <span className="text-sm text-gray-500">Stock: {product.inventory}</span>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Edit className="h-4 w-4 mr-1" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md divide-y">
                    <div className="grid grid-cols-12 p-4 bg-gray-50 font-medium text-sm">
                      <div className="col-span-5">Product</div>
                      <div className="col-span-2 text-center">Status</div>
                      <div className="col-span-1 text-center">Price</div>
                      <div className="col-span-2 text-center">Inventory</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    {sortedProducts.map(product => (
                      <div key={product.id} className="grid grid-cols-12 p-4 items-center hover:bg-gray-50">
                        <div className="col-span-5 flex items-center gap-3">
                          <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{product.description}</p>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <Badge className={getStatusColor(product.status)}>
                            {product.status}
                          </Badge>
                        </div>
                        <div className="col-span-1 text-center font-medium">{product.price} SOL</div>
                        <div className="col-span-2 text-center">{product.inventory}</div>
                        <div className="col-span-2 flex justify-end gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {sortedProducts.length === 0 && (
                  <div className="text-center py-10 text-gray-500">
                    No products found. Try adjusting your search.
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="active">
                <div className="text-center py-10 text-gray-500">
                  Active products will appear here.
                </div>
              </TabsContent>
              
              <TabsContent value="draft">
                <div className="text-center py-10 text-gray-500">
                  Draft products will appear here.
                </div>
              </TabsContent>
              
              <TabsContent value="archived">
                <div className="text-center py-10 text-gray-500">
                  Archived products will appear here.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
