import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import ToolBar from './workspace/ToolBar';
import BoardGrid from './workspace/BoardGrid';
import WhiteboardCanvas from './whiteboard/WhiteboardCanvas';
import InspirationBoard from './inspiration/InspirationBoard';
import WorkspaceNav from './workspace/WorkspaceNav';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('boards');

  const renderContent = () => {
    switch (activeTab) {
      case 'whiteboard':
        return <WhiteboardCanvas />;
      case 'inspiration':
        return <InspirationBoard />;
      case 'boards':
      default:
        return <BoardGrid />;
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <ToolBar />
        <WorkspaceNav activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}