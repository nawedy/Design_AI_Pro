import { supabase } from '../../lib/supabase';
import type { Workspace, User } from '../../types/workspace';

export async function createWorkspace(name: string, type: 'private' | 'collaborative') {
  const { data: user } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('workspaces')
    .insert({
      name,
      type,
      owner_id: user.user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function addMemberToWorkspace(workspaceId: string, email: string, role: string = 'member') {
  const { data: userToAdd, error: userError } = await supabase
    .from('users')
    .select()
    .eq('email', email)
    .single();

  if (userError) throw userError;

  const { error } = await supabase
    .from('workspace_members')
    .insert({
      workspace_id: workspaceId,
      user_id: userToAdd.id,
      role
    });

  if (error) throw error;
}