export interface Task {
  id?: string;
  name?: string;
  description?: string;
  category?: 'Exercise' | 'Study';
  status?: 'TODO' | 'DONE' | 'IGNORED';
  date?: Date;
  priority?: 'low' | 'high' | 'medium';
}
