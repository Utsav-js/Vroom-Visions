import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import ReviewForm from "@/components/ReviewForm";
import Newsletter from "@/components/Newsletter";
import { mainFeatures, whyChooseUs } from "@/data/features";
import { testimonials } from "@/data/testimonials";
import products from "@/data/products";

// Import car images for before/after slider
import beforeImage from "@assets/LUTS.jpg";
import afterImage from "@assets/LUT.jpg";

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch products from the API (fallback to local data)
  const { data: apiProducts, isLoading, isError } = useQuery({
    queryKey: ['/api/products'],
    retry: 1,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false
  });

  // Use local data if API fails or is loading
  const displayProducts = apiProducts || products;

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const handleGoToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <>
      {/* Main background wrapper - fixed position to cover entire viewport */}
      <div className="fixed inset-0 z-[-1]">
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
          <video 
            className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-80"
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
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Animated glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] z-[4] hero-glow"></div>
        
        <div className="container relative mx-auto px-4 z-[5]">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
              Transform Your Car Photography
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Professional color grading that turns ordinary car photos into showroom-quality imagery with just one click.
            </p>
          </div>
          
          {/* Image Comparison Slider */}
          <div className="max-w-2xl mx-auto">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              aspectRatio="video"
            />
            <p className="text-center mt-3 text-gray-400">
              Drag the slider to see the dramatic difference our premium LUTs make.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-brand-dark" id="features">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* LUTs Section */}
      <section className="py-16 relative overflow-hidden" id="luts-section">
        {/* Black hole video background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video 
            className="absolute w-full h-full object-cover opacity-30" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/blackhole.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">LUTs Collection</h2>
            <Link to="/products" className="text-brand-purple hover:underline flex items-center">
              Show all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayProducts as any[]).map((product: { slug: string; id: number; name: string; description: string; price: number; originalPrice: number | null; discount: number | null; features: string[] | null; category: string; compatibility: string[] | null; imageUrl: string; }) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-brand-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-brand-purple bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-brand-purple text-xl" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-brand-gray" id="testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">What Our Clients Say</h2>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Testimonial Cards Container */}
            <div className="overflow-hidden">
              <TestimonialCard 
                name={testimonials[currentTestimonial].name}
                role={testimonials[currentTestimonial].role}
                image={testimonials[currentTestimonial].image}
                rating={testimonials[currentTestimonial].rating}
                comment={testimonials[currentTestimonial].comment}
              />
            </div>
            
            {/* Navigation Arrows */}
            <Button
              variant="default"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 md:-ml-6 bg-brand-purple w-10 h-10 rounded-full flex items-center justify-center p-0"
              onClick={handlePrevTestimonial}
            >
              <ChevronLeft className="text-white" />
            </Button>
            <Button
              variant="default"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 md:-mr-6 bg-brand-purple w-10 h-10 rounded-full flex items-center justify-center p-0"
              onClick={handleNextTestimonial}
            >
              <ChevronRight className="text-white" />
            </Button>
            
            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-2 h-2 rounded-full p-0 ${index === currentTestimonial ? 'bg-brand-purple' : 'bg-gray-500'}`}
                  onClick={() => handleGoToTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-16 bg-brand-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Share Your Experience</h2>
          <ReviewForm />
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default Home;
