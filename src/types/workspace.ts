export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  type: 'private' | 'collaborative';
  members: User[];
  owner: User;
  createdAt: string;
  updatedAt: string;
}

export interface ShareSettings {
  access: 'view' | 'edit' | 'comment';
  expiresAt?: string;
  allowDownload: boolean;
}