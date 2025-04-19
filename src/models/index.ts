export interface Task {
  id: string;
  title: string;
  description?: string;
  date?: Date;
  status: string;
}

export interface Board {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}
