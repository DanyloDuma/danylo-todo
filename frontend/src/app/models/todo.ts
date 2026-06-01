export interface Todo {
  id?: number;
  title: string;
  description?: string;
  due_date: string;
  category_id: number;
  user_id: number;
  is_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}
