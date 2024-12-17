import React from 'react';
import { Layout, Pencil, Bookmark, Settings } from 'lucide-react';

interface WorkspaceNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function WorkspaceNav({ activeTab, onTabChange }: WorkspaceNavProps) {
  const tabs = [
    { id: 'boards', icon: <Layout className="w-5 h-5" />, label: 'Boards' },
    { id: 'whiteboard', icon: <Pencil className="w-5 h-5" />, label: 'Whiteboard' },
    { id: 'inspiration', icon: <Bookmark className="w-5 h-5" />, label: 'Inspiration' },
    { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="border-b border-[#393E46] bg-[#222831]">
      <div className="flex space-x-4 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#FD7014] text-[#FD7014]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}