import React from "react";
import { Link } from "wouter";
import Logo from "./Logo";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/">
              <a className="cursor-pointer mb-4 inline-block">
                <Logo />
              </a>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Professional car editing and color grading solutions that transform ordinary photos into extraordinary visuals.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vroom_visionsx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#luts-section">
                  <a className="text-gray-400 hover:text-white">Color Grading LUTs</a>
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Cinematic Presets</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Video Editing Packs</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Professional Editing</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Tutorials</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Support</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} VroomVisionX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
