class Task {
  id: string;
  text: string;

  constructor(taskText: string) {
    this.text = taskText;
    this.id = new Date().toISOString();
  }
}

export default Task;
