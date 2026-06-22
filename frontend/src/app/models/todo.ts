export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TodoData {
  title: string;
  description: string | null;
  is_completed?: boolean;
}

export type TodoStatus = 'all' | 'pending' | 'completed';
