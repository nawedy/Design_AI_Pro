import React from 'react';
import { FolderPlus, Layout, Image, Type, Box } from 'lucide-react';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  const menuItems = [
    { icon: <Layout className="w-5 h-5" />, label: 'Boards', active: true },
    { icon: <Image className="w-5 h-5" />, label: 'Templates' },
    { icon: <Type className="w-5 h-5" />, label: 'Text Styles' },
    { icon: <Box className="w-5 h-5" />, label: 'Components' },
  ];

  return (
    <div className="w-64 bg-[#222831] h-screen fixed left-0 top-0 border-r border-[#393E46]">
      <div className="p-4">
        <button className="w-full bg-[#FD7014] text-white rounded-lg p-3 flex items-center justify-center space-x-2 hover:bg-opacity-90">
          <FolderPlus className="w-5 h-5" />
          <span>Create Board</span>
        </button>
      </div>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}