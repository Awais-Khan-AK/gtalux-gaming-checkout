
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

// Mock products data
const productsData = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Game Pack ${i + 1}`,
  description: `This is a digital game pack containing premium in-game items and bonuses.`,
  price: (Math.random() * 10 + 0.1).toFixed(2),
  inventory: Math.floor(Math.random() * 100),
  image: `https://placehold.co/100x100?text=Game${i+1}`,
}));

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducts = productsData.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className="bg-gaming-primary hover:bg-gaming-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover" 
              />
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
    </div>
  );
};

export default AdminProducts;
