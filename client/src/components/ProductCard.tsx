import React from "react";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <a className="block bg-brand-dark rounded-lg overflow-hidden group transition-transform hover:scale-[1.02]">
        <div className="relative h-48">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="discount-badge">-{product.discount}%</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
          <div className="flex space-x-2 mb-3">
            {product.compatibility?.map((comp) => (
              <Badge key={comp} variant="outline" className="bg-zinc-700 text-xs px-2 py-0.5 rounded">
                {comp}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-bold">${(product.price / 100).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  ${(product.originalPrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              className="bg-zinc-700 hover:bg-zinc-600 p-2 rounded"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
