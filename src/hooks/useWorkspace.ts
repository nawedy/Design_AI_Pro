import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Workspace } from '../types/workspace';

export function useWorkspace(workspaceId?: string) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workspaceId) {
      setLoading(false);
      return;
    }

    const fetchWorkspace = async () => {
      try {
        const { data, error } = await supabase
          .from('workspaces')
          .select('*')
          .eq('id', workspaceId)
          .single();

        if (error) throw error;
        setWorkspace(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  return { workspace, loading, error };
}