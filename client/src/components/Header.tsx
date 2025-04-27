import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Logo from "./Logo";
import { ShoppingCart, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Change background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Features", path: "/#features" },
    { label: "Products", path: "/#luts-section" },
    { label: "Reviews", path: "/#testimonials" }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-purple-900/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Logo />
        </div>
        
        <div className="hidden md:flex space-x-1">
          <div className="bg-purple-900/20 backdrop-blur-lg px-4 py-1 rounded-full flex space-x-1 border border-white/10 shadow-glow">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-white hover:bg-purple-500/20 px-3 py-1 rounded-full text-sm transition-all duration-300"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <a 
            href="https://www.instagram.com/vroom_visionsx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-purple-400 hover:text-white flex items-center rounded-full bg-purple-900/30 p-1.5 border border-white/10 shadow-glow transition-colors"
          >
            <Instagram size={16} />
          </a>
          <button className="text-gray-400 hover:text-white bg-transparent border-0 p-0 transition-colors">
            <Facebook size={16} />
          </button>
          <button className="text-gray-400 hover:text-white bg-transparent border-0 p-0 transition-colors flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C7.0275 3 3 7.0275 3 12C3 16.9725 7.0275 21 12 21C16.9725 21 21 16.9725 21 12C21 7.0275 16.9725 3 12 3ZM18 13.2C18 15.0 16.5 16.5 14.7 16.5H11.4C9.6 16.5 8.1 15.0 8.1 13.2V10.8C8.1 9 9.6 7.5 11.4 7.5H14.7C16.5 7.5 18 9 18 10.8V13.2Z" 
                fill="currentColor"/>
            </svg>
          </button>
          <div 
            onClick={() => navigate("/checkout")} 
            className="text-white hover:text-purple-300 relative cursor-pointer flex items-center rounded-full bg-purple-900/30 p-1.5 border border-white/10 shadow-glow transition-colors"
          >
            <ShoppingCart size={16} />
            {itemCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs p-0 border border-white/20 shadow-glow">
                {itemCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="md:hidden">
        <div className="container mx-auto px-4 py-2 flex justify-center">
          <div className="bg-purple-900/20 backdrop-blur-lg px-3 py-1 rounded-full flex space-x-1 border border-white/10 shadow-glow">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="text-white hover:bg-purple-500/20 px-2 py-1 rounded-full text-sm transition-all duration-300"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
