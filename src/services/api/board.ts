import { supabase } from '../../lib/supabase';

export async function createBoard(workspaceId: string, title: string, content?: any) {
  const { data, error } = await supabase
    .from('boards')
    .insert({
      workspace_id: workspaceId,
      title,
      content
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBoards(workspaceId: string) {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}