import React, { useState } from 'react';
import { Search, Settings, Share2, User, Users } from 'lucide-react';
import WorkspaceSelector from './WorkspaceSelector';
import ShareModal from '../sharing/ShareModal';
import type { Workspace, ShareSettings } from '../../types/workspace';

export default function ToolBar() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>({
    id: '1',
    name: 'Personal Workspace',
    type: 'private',
    members: [],
    owner: { id: '1', name: 'John Doe', email: 'john@example.com' },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const handleShare = (settings: ShareSettings, emails?: string[]) => {
    // Implement sharing logic here
    console.log('Share settings:', settings, emails);
    setShowShareModal(false);
  };

  return (
    <div className="h-14 border-b border-[#393E46] flex items-center justify-between px-6 bg-[#222831]">
      <div className="flex items-center space-x-4">
        <WorkspaceSelector
          workspaces={[activeWorkspace]}
          activeWorkspace={activeWorkspace}
          onWorkspaceChange={setActiveWorkspace}
        />
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search boards..."
            className="bg-[#393E46] text-white pl-10 pr-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#FD7014]"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {activeWorkspace.type === 'collaborative' && (
          <button className="p-2 text-gray-400 hover:text-white">
            <Users className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={() => setShowShareModal(true)}
          className="p-2 text-gray-400 hover:text-white"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-white">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-[#FD7014] rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />
    </div>
  );
}