import React from "react";
import { useRoute, Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Newsletter from "@/components/Newsletter";
import { useCart } from "@/contexts/CartContext";
import products from "@/data/products";
import { Product } from "@shared/schema";

const ProductDetail: React.FC = () => {
  const [matched, params] = useRoute("/products/:slug");
  const [, navigate] = useLocation();
  const { addToCart } = useCart();
  
  // Try to fetch product from API
  const { data: apiProduct, isLoading, isError } = useQuery({
    queryKey: [`/api/products/${params?.slug}`],
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!params?.slug
  });
  
  // Fallback to local data if API fails
  const product = apiProduct || products.find(p => p.slug === params?.slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <p className="mt-4 text-gray-400">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button 
            className="mt-6 bg-purple-500 hover:bg-purple-600" 
            onClick={() => navigate("/")}
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const renderRating = () => {
    return (
      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400 mr-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-4 h-4 ${star <= 4.5 ? "fill-current" : ""}`} 
            />
          ))}
        </div>
        <span className="text-gray-400">(42 reviews)</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <Link href="/#luts-section">
            <a className="text-gray-400 hover:text-white flex items-center">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to products
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-auto"
              />
              {product.discount && (
                <div className="discount-badge">-{product.discount}%</div>
              )}
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            {renderRating()}
            
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold mr-2">${(product.price / 100).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">${(product.originalPrice / 100).toFixed(2)}</span>
              )}
            </div>
            
            <div className="flex space-x-2 mb-6">
              {product.compatibility?.map((comp) => (
                <Badge key={comp} variant="outline" className="bg-zinc-700 text-xs px-2 py-0.5 rounded">
                  {comp}
                </Badge>
              ))}
            </div>
            
            <p className="text-gray-300 mb-6">{product.description}</p>
            
            <h3 className="text-lg font-bold mb-2">Key Features</h3>
            <ul className="list-disc text-gray-300 pl-5 mb-6 space-y-1">
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            
            <div className="flex space-x-3">
              <Button 
                className="bg-brand-purple hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent hover:bg-zinc-800 border border-zinc-700 text-white px-6 py-3 rounded-md font-medium"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Newsletter Alternative */}
        <Newsletter variant="alternative" className="mt-16" />
      </div>
    </section>
  );
};

export default ProductDetail;
