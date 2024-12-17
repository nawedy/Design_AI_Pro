import React from 'react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function SidebarItem({ icon, label, active }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors
        ${active ? 'bg-[#393E46] text-white' : 'text-gray-400 hover:bg-[#393E46] hover:text-white'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}