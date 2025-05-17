import type { Product } from "@shared/schema";

// LUT image URLs
import lutImage1 from "@assets/LUTS.jpg";
import lutImage2 from "@assets/LUT.jpg";

export const products: Product[] = [
  {
    id: 1,
    name: "Color Grading LUTs",
    slug: "color-grading-luts",
    description: "Professional color grading LUTs for car photography. Transform your images with just one click.",
    price: 5900,
    originalPrice: 11900,
    discount: 50,
    features: [
      "20+ unique LUTs for different lighting conditions",
      "Compatible with Adobe Premiere Pro, After Effects, and Final Cut Pro X",
      "Installation guide included",
      "Free updates for life"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: "/Screenshot 2025-03-25 161159.png"
  },
  {
    id: 2,
    name: "Color Grading LUTs Volume 2",
    slug: "color-grading-luts-volume-2",
    description: "Expand your car photography toolkit with our second volume of professional LUTs. Perfect for moody and dramatic car shots.",
    price: 5900,
    originalPrice: 11900,
    discount: 50,
    features: [
      "15 new cinematic LUTs for diverse lighting",
      "Compatible with all major editing software",
      "Before/after examples included",
      "One-click application"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: "/Screenshot 2025-03-26 185115.png"
  },
  {
    id: 3,
    name: "Sci-Fi LUTs",
    slug: "sci-fi-luts",
    description: "Give your automotive photography a futuristic sci-fi look with these specialized LUTs. Perfect for concept cars and night shots.",
    price: 3900,
    originalPrice: 7900,
    discount: 50,
    features: [
      "10 futuristic color grading presets",
      "Neon and cyberpunk effects",
      "Compatible with major editing software",
      "Video tutorial included"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: "/Screenshot 2025-03-26 191217.png"
  },
  {
    id: 4,
    name: "Vintage Car LUTs",
    slug: "vintage-car-luts",
    description: "Specialized LUTs designed for classic and vintage car photography. Add nostalgic film looks to your automotive shots.",
    price: 3900,
    originalPrice: 7900,
    discount: 50,
    features: [
      "12 vintage film emulation LUTs",
      "Perfect for classic car photography",
      "Period-appropriate color profiles",
      "Works with JPG and RAW images"
    ],
    category: "luts",
    compatibility: ["AE", "PR", "FCPX"],
    imageUrl: "/Screenshot 2025-03-26 202926.png"
  }
];

export default products;
