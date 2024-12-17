import React, { useState } from 'react';
import { Layout, Palette, Layers, Wand2 } from 'lucide-react';

interface DesignOption {
  id: number;
  preview: string;
  description: string;
}

export default function DesignWorkspace() {
  const [designOptions, setDesignOptions] = useState<DesignOption[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDesigns = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setDesignOptions([
        {
          id: 1,
          preview: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800",
          description: "Modern minimalist design with focus on typography"
        },
        {
          id: 2,
          preview: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800",
          description: "Bold and dynamic layout with accent colors"
        },
        {
          id: 3,
          preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
          description: "Creative grid-based design with visual hierarchy"
        }
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#222831]">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3 bg-[#393E46] rounded-xl p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-white font-semibold">Project Settings</h3>
                <input
                  type="text"
                  placeholder="Project name"
                  className="w-full bg-[#222831] text-white rounded-lg p-2"
                />
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={generateDesigns}
                  disabled={isGenerating}
                  className="w-full bg-[#FD7014] text-white p-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-90 transition-all"
                >
                  <Wand2 className="w-5 h-5" />
                  <span>{isGenerating ? 'Generating...' : 'Generate Designs'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9 space-y-6">
            <div className="grid grid-cols-3 gap-6">
              {designOptions.map((option) => (
                <div key={option.id} className="bg-[#393E46] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#FD7014] transition-all cursor-pointer">
                  <img src={option.preview} alt="Design preview" className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-white">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}