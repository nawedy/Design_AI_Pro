import React from 'react';
import { Users, Lock, ChevronDown } from 'lucide-react';
import type { Workspace } from '../../types/workspace';

interface WorkspaceSelectorProps {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  onWorkspaceChange: (workspace: Workspace) => void;
}

export default function WorkspaceSelector({ workspaces, activeWorkspace, onWorkspaceChange }: WorkspaceSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-[#393E46] rounded-lg text-white hover:bg-opacity-90 transition-colors"
      >
        {activeWorkspace.type === 'collaborative' ? (
          <Users className="w-4 h-4" />
        ) : (
          <Lock className="w-4 h-4" />
        )}
        <span>{activeWorkspace.name}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-[#393E46] rounded-lg shadow-lg overflow-hidden z-50">
          {workspaces.map((workspace) => (
            <button
              key={workspace.id}
              onClick={() => {
                onWorkspaceChange(workspace);
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#222831] transition-colors"
            >
              {workspace.type === 'collaborative' ? (
                <Users className="w-4 h-4 text-[#FD7014]" />
              ) : (
                <Lock className="w-4 h-4 text-[#FD7014]" />
              )}
              <div className="flex-1 text-left">
                <p className="text-white font-medium">{workspace.name}</p>
                <p className="text-sm text-gray-400">
                  {workspace.type === 'collaborative'
                    ? `${workspace.members.length} members`
                    : 'Private workspace'}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}