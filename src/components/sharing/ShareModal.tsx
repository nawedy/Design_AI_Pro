import React, { useState } from 'react';
import { X, Copy, Mail, Link as LinkIcon } from 'lucide-react';
import type { ShareSettings } from '../../types/workspace';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (settings: ShareSettings, emails?: string[]) => void;
}

export default function ShareModal({ isOpen, onClose, onShare }: ShareModalProps) {
  const [settings, setSettings] = useState<ShareSettings>({
    access: 'view',
    allowDownload: false,
  });
  const [emails, setEmails] = useState('');
  const [shareMethod, setShareMethod] = useState<'link' | 'email'>('link');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#222831] rounded-xl w-[480px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Share Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setShareMethod('link')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center space-x-2
                ${shareMethod === 'link' ? 'bg-[#FD7014] text-white' : 'bg-[#393E46] text-gray-300'}`}
            >
              <LinkIcon className="w-5 h-5" />
              <span>Share via Link</span>
            </button>
            <button
              onClick={() => setShareMethod('email')}
              className={`flex-1 p-3 rounded-lg flex items-center justify-center space-x-2
                ${shareMethod === 'email' ? 'bg-[#FD7014] text-white' : 'bg-[#393E46] text-gray-300'}`}
            >
              <Mail className="w-5 h-5" />
              <span>Invite by Email</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Access Level</label>
              <select
                value={settings.access}
                onChange={(e) => setSettings({ ...settings, access: e.target.value as ShareSettings['access'] })}
                className="w-full bg-[#393E46] text-white rounded-lg p-2"
              >
                <option value="view">View only</option>
                <option value="comment">Can comment</option>
                <option value="edit">Can edit</option>
              </select>
            </div>

            {shareMethod === 'email' && (
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Email Addresses</label>
                <textarea
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="Enter email addresses (comma-separated)"
                  className="w-full bg-[#393E46] text-white rounded-lg p-2 h-24"
                />
              </div>
            )}

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.allowDownload}
                onChange={(e) => setSettings({ ...settings, allowDownload: e.target.checked })}
                className="rounded border-gray-400"
              />
              <span className="text-white">Allow downloading assets</span>
            </label>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => onShare(settings, shareMethod === 'email' ? emails.split(',').map(e => e.trim()) : undefined)}
              className="flex-1 bg-[#FD7014] text-white py-2 rounded-lg hover:bg-opacity-90"
            >
              Share
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#393E46] text-white py-2 rounded-lg hover:bg-opacity-90"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}