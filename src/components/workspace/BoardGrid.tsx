import React from 'react';
import { Plus } from 'lucide-react';
import BoardCard from './BoardCard';

interface Board {
  id: string;
  title: string;
  preview: string;
  lastModified: string;
}

export default function BoardGrid() {
  const boards: Board[] = [
    {
      id: '1',
      title: 'Landing Page Design',
      preview: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=800',
      lastModified: '2 hours ago'
    },
    {
      id: '2',
      title: 'Mobile App UI',
      preview: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800',
      lastModified: 'Yesterday'
    }
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-6">
        <div className="h-64 border-2 border-dashed border-[#393E46] rounded-xl flex items-center justify-center cursor-pointer hover:border-[#FD7014] transition-colors">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#393E46] flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-medium">New Board</span>
          </div>
        </div>
        {boards.map((board) => (
          <BoardCard key={board.id} {...board} />
        ))}
      </div>
    </div>
  );
}