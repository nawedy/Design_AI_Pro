import React from 'react';
import { Sparkles, Wand2, Palette, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#222831] to-[#393E46] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-[#FD7014]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Design Smarter with
            <span className="text-[#FD7014]"> AI</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create stunning designs instantly with our AI-powered platform. Multiple AI models,
            real-time collaboration, and professional tools all in one place.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-[#FD7014] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started Free
            </button>
            <button className="border border-[#FD7014] text-[#FD7014] px-8 py-3 rounded-lg hover:bg-[#FD7014] hover:text-white transition-colors">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Features section remains the same */}
      </div>
    </div>
  );
}