export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          created_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          type: string
          owner_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string
          owner_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          owner_id?: string
          created_at?: string
        }
      }
      boards: {
        Row: {
          id: string
          title: string
          content: Json | null
          workspace_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content?: Json | null
          workspace_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: Json | null
          workspace_id?: string
          created_at?: string
        }
      }
    }
  }
}