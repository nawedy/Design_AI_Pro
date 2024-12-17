import React from 'react';
import { User, Crown, MoreVertical } from 'lucide-react';
import type { User as UserType } from '../../types/workspace';

interface MembersPanelProps {
  members: UserType[];
  owner: UserType;
  onRemoveMember?: (userId: string) => void;
  onPromoteToOwner?: (userId: string) => void;
}

export default function MembersPanel({ members, owner, onRemoveMember, onPromoteToOwner }: MembersPanelProps) {
  return (
    <div className="bg-[#393E46] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Workspace Members</h3>
      <div className="space-y-3">
        {[owner, ...members].map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 bg-[#FD7014] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <p className="text-white font-medium">{member.name}</p>
                <p className="text-sm text-gray-400">{member.email}</p>
              </div>
              {member.id === owner.id && (
                <Crown className="w-4 h-4 text-[#FD7014]" />
              )}
            </div>
            {member.id !== owner.id && onRemoveMember && onPromoteToOwner && (
              <div className="relative group">
                <button className="p-1 text-gray-400 hover:text-white">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-[#222831] rounded-lg shadow-lg hidden group-hover:block">
                  <button
                    onClick={() => onPromoteToOwner(member.id)}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#393E46]"
                  >
                    Make Owner
                  </button>
                  <button
                    onClick={() => onRemoveMember(member.id)}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-[#393E46]"
                  >
                    Remove Member
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}