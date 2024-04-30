interface Task {
  id: string;
  title: string;
  description?: string;
  date?: Date;
  status: string;
}

export default Task;
