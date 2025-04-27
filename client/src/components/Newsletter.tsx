import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface NewsletterProps {
  variant?: "default" | "alternative";
  className?: string;
}

const Newsletter: React.FC<NewsletterProps> = ({ 
  variant = "default",
  className = "", 
}) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { email });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to subscribe");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been successfully subscribed to our newsletter.",
        variant: "default"
      });
      setEmail("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe",
        variant: "destructive"
      });
    }
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    mutation.mutate(email);
  };

  if (variant === "alternative") {
    return (
      <div className={`max-w-4xl mx-auto p-6 bg-brand-dark rounded-lg ${className}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Stay updated with the latest</h3>
            <p className="text-gray-400">Subscribe to our newsletter for exclusive offers and car editing tips</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-zinc-800 border border-zinc-700 rounded-l-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-r-md font-medium"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-10 bg-brand-gray border-t border-zinc-800 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Stay Updated</h3>
            <p className="text-gray-400">Get the latest updates, tutorials and offers</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-brand-dark border border-zinc-700 rounded-l-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              type="submit" 
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-r-md font-medium"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
