import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  aspectRatio?: "square" | "video" | "auto";
  className?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  aspectRatio = "auto",
  className = "",
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
      <div className="rounded-lg overflow-hidden shadow-xl">
        <div className="relative">
          {/* The slider container */}
          <div 
            ref={sliderRef}
            className={`side-by-side-slider ${getAspectRatioClass()} ${className}`}
            style={{ 
              "--position": `${position}%` 
            } as React.CSSProperties}
          >
            {/* Left side (Before) */}
            <div className="before-side">
              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gray-700/90 text-white text-sm font-medium rounded">
                Before
              </div>
              <img 
                src={beforeImage} 
                alt="Before" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Right side (After) */}
            <div className="after-side">
              {/* After Label */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded">
                After
              </div>
              <img 
                src={afterImage} 
                alt="After" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* The divider handle */}
            <div className="divider">
              <div className="handle-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 7L14 12L10 17" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 7L10 12L14 17" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="divider-line"></div>
            </div>
            
            {/* Draggable overlay */}
            <div 
              className="slider-overlay"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
