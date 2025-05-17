import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Checkout: React.FC = () => {
  const [, navigate] = useLocation();
  const { cart, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveInfo, setSaveInfo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handlePayment = async () => {
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful",
        description: "Your order has been processed successfully",
        variant: "default",
      });
      clearCart();
      navigate("/");
    }, 1500);
  };

  const handleRazorpayPayment = async () => {
    if (!email) {
      toast({
        title: "Missing information",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create order on backend (should be a real API call)
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: getTotalPrice(), // amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          email,
        }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok) throw new Error(orderData.message || "Order creation failed");

      const options = {
        key: "rzp_test_dHkauYoJzkvNij",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Vroom Visions",
        description: "Product Purchase",
        order_id: orderData.id,
        handler: function (response: any) {
          setIsProcessing(false);
          toast({
            title: "Payment successful",
            description: "Your order has been processed successfully",
            variant: "default",
          });
          clearCart();
          // Navigate to success page and pass email
          navigate(`/payment-success?email=${encodeURIComponent(email)}`);
        },
        prefill: {
          email,
        },
        notes: {},
        theme: { color: "#a259ff" },
        callback_url: "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTY4MDYzMTA0MzI1MjZkNTUzMTUxMzYi_pc"
      };
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      setIsProcessing(false);
      toast({
        title: "Payment failed",
        description: error.message || "Payment could not be processed",
        variant: "destructive",
      });
    }
  };

  const totalPrice = getTotalPrice();
  const formattedTotal = (totalPrice / 100).toFixed(2);

  return (
    <>
      {/* Main background wrapper - fixed position to cover entire viewport */}
      <div className="fixed inset-0 z-[-1]">
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-[1]"></div> {/* Adjusted overlay */}
          <video 
            className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-80" // Adjusted opacity
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/public/videos/blackhole.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Stars overlays - three layers for parallax effect */}
        <div className="absolute inset-0 z-[2] stars stars-large opacity-70"></div>
        <div className="absolute inset-0 z-[2] stars opacity-60"></div>
        <div className="absolute inset-0 z-[2] stars stars-small opacity-60"></div>
      </div>
      
      <section className="relative py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-6">
            <Link href="/">
              <a className="text-gray-400 hover:text-white flex items-center">
                <ArrowLeft className="mr-2 w-4 h-4" /> Continue shopping
              </a>
            </Link>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Checkout</h1>
          
          {cart.length === 0 ? (
            <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg text-center shadow-glow border border-white/10">
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Button 
                className="bg-purple-600/70 hover:bg-purple-600 shadow-glow border border-white/10"
                onClick={() => navigate("/")}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                  <div className="mb-4">
                    <Label htmlFor="checkout-email" className="block text-sm font-medium mb-1">Email</Label>
                    <Input 
                      type="email" 
                      id="checkout-email" 
                      placeholder="your@email.com" 
                      className="w-full bg-purple-950/40 backdrop-blur-md border border-white/10 rounded-md px-4 py-2 focus:border-purple-500/50 shadow-glow" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={handlePaymentMethodChange}
                    className="space-y-3"
                  >
                    <div className="flex items-center p-3 border border-white/10 rounded-md bg-purple-950/40 backdrop-blur-md">
                      <RadioGroupItem value="card" id="payment-card" className="mr-3" />
                      <Label htmlFor="payment-card" className="flex items-center">
                        <svg 
                          className="mr-2 w-5 h-5 text-purple-300" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg> Card
                      </Label>
                    </div>
                    
                    <div className="flex items-center p-3 border border-white/10 rounded-md bg-purple-950/40 backdrop-blur-md">
                      <RadioGroupItem value="paypal" id="payment-paypal" className="mr-3" />
                      <Label htmlFor="payment-paypal" className="flex items-center">
                        <svg 
                          className="mr-2 w-5 h-5 text-purple-300" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M7 11c.33-.44.67-.9 1-1.33 1.17-1.5 2.33-3 3.67-4.17C13.22 4.05 14.56 3 16 3c1.66 0 3 1.34 3 3 0 .34-.04.67-.12 1h-2.3c.12-.33.2-.67.2-1 0-.55-.45-1-1-1s-1 .45-1 1v1c-1.21 0-2.18.46-3 1.11-1.03.81-1.75 1.8-2.44 2.77-.15.21-.3.42-.44.65"/>
                          <path d="M17.49 9.6c.47.47.87 1.18.91 1.91.04.78-.34 1.53-.82 2.25-1.57 2.37-10.58 5.74-10.58 5.74-3.5 0-4-7 1-7 1.31 0 4.59 1.03 4.59 1.03"/>
                          <path d="M14 8c-1.87 0-3.86 1.42-4.73 3.05"/>
                        </svg> PayPal
                      </Label>
                    </div>
                    
                    <div className="flex items-center p-3 border border-white/10 rounded-md bg-purple-950/40 backdrop-blur-md">
                      <RadioGroupItem value="upi" id="payment-upi" className="mr-3" />
                      <Label htmlFor="payment-upi" className="flex items-center">
                        <svg 
                          className="mr-2 w-5 h-5 text-purple-300" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <rect width="16" height="20" x="4" y="2" rx="2" />
                          <line x1="10" x2="14" y1="18" y2="18" />
                        </svg> UPI
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-4">
                    <div className="flex items-center">
                      <Checkbox 
                        id="save-info" 
                        checked={saveInfo}
                        onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                        className="mr-2"
                      />
                      <Label htmlFor="save-info" className="text-sm text-gray-300">
                        Securely save my information for 1-click checkout
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-purple-600/70 hover:bg-purple-600 text-white py-3 rounded-md font-medium shadow-glow border border-white/10" 
                  onClick={paymentMethod === "card" ? handleRazorpayPayment : handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : "Pay"}
                </Button>
              </div>
              
              <div>
                <div className="bg-purple-900/20 backdrop-blur-md p-6 rounded-lg shadow-glow border border-white/10 sticky top-20">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="border-b border-white/10 pb-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex mb-4 p-2 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-20 h-20 rounded object-cover border border-white/10"
                        />
                        <div className="ml-3">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <div className="text-gray-400 text-sm">Qty: {item.quantity}</div>
                          <div className="font-medium mt-1 text-white">${((item.product.price * item.quantity) / 100).toFixed(2)}</div>
                        </div>
                        <button 
                          className="ml-auto text-gray-400 hover:text-white hover:bg-red-500/20 p-1 rounded-full transition-colors"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4 p-3 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium">${formattedTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>Calculated at next step</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between font-bold text-lg p-3 rounded-lg bg-purple-950/40 backdrop-blur-sm border border-white/5 mt-4">
                    <span>Total</span>
                    <span className="text-white">${formattedTotal}</span>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-400">
                    By confirming your payment, you allow AEJuice LLC to charge you for this payment and future payments in accordance with their terms.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
