import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-[#222831] to-[#393E46] p-6">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-8 h-8 text-[#FD7014]" />
          <span className="text-2xl font-bold text-white">DesignAI Pro</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-[#FD7014] transition-colors">Templates</button>
          <button className="text-white hover:text-[#FD7014] transition-colors">Features</button>
          <button className="text-white hover:text-[#FD7014] transition-colors">Pricing</button>
          <button 
            onClick={() => navigate('/auth')}
            className="bg-[#FD7014] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}