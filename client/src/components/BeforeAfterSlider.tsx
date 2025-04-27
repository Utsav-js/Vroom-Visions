import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
  beforeSize?: string;
  afterSize?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  aspectRatio = "auto",
  className = "",
  beforeSize = "700KB",
  afterSize = "250KB",
}) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "video":
        return "aspect-video";
      default:
        return "h-60 md:h-96";
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const newPosition = x * 100;
    setPosition(newPosition);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Slider Container with outer border */}
      <div className="relative overflow-hidden rounded-lg shadow-glow">
        <div 
          ref={sliderRef}
          className={`comparison-slider ${getAspectRatioClass()} ${className}`}
          style={{ "--position": `${position}%` } as React.CSSProperties}
        >
          {/* After image with label */}
          <div 
            className="after w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${afterImage})` }}
          >
            {/* After Label - top right */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white font-bold text-sm z-10">
              After
            </div>
          </div>
          
          {/* Before image with label */}
          <div 
            className="before w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${beforeImage})` }}
          >
            {/* Before Label - top left */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-gray-700/80 text-white font-bold text-sm z-10">
              Before
            </div>
          </div>
          
          {/* Center handle with arrow icon */}
          <div 
            className="handle" 
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <span className="arrow-icon"></span>
          </div>
        </div>
        
        {/* File size information bar */}
        <div className="flex justify-between items-center bg-gray-800 text-white text-sm">
          <div className="py-2 px-3 font-medium">
            SIZE BEFORE: {beforeSize}
          </div>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="py-2 px-3 bg-red-500 font-medium">
            AFTER: {afterSize}
          </div>
        </div>
      </div>
      
      {/* See any difference text */}
      <div className="text-center mt-2 text-gray-400 flex items-center justify-end">
        <span className="text-red-400">•</span>
        <span className="ml-1">See any difference?</span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
