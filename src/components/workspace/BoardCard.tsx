import React from 'react';
import { MoreVertical, Clock } from 'lucide-react';

interface BoardCardProps {
  title: string;
  preview: string;
  lastModified: string;
}

export default function BoardCard({ title, preview, lastModified }: BoardCardProps) {
  return (
    <div className="bg-[#393E46] rounded-xl overflow-hidden group">
      <div className="relative">
        <img src={preview} alt={title} className="w-full h-40 object-cover" />
        <button className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4 text-white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium mb-2">{title}</h3>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          <span>{lastModified}</span>
        </div>
      </div>
    </div>
  );
}