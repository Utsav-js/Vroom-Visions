import React from "react";
import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { ShoppingCart, Instagram, Facebook, Twitter } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart } = useCart();
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { label: "Features", path: "/#features" },
    { label: "Products", path: "/#luts-section" },
    { label: "Reviews", path: "/#testimonials" }
  ];

  return (
    <header className="bg-brand-dark sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="cursor-pointer">
            <Logo />
          </a>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full text-sm"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <a href="#" className="text-white hover:text-brand-purple">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-white hover:text-brand-purple">
            <Facebook size={18} />
          </a>
          <a href="#" className="text-white hover:text-brand-purple">
            <Twitter size={18} />
          </a>
          <Link href="/checkout">
            <a className="text-white hover:text-brand-purple relative">
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs p-0">
                  {itemCount}
                </Badge>
              )}
            </a>
          </Link>
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-2 flex justify-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1 rounded-full text-sm"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
