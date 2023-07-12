class Task {
  id: string;
  text: string;
  date: Date | null;
  time: string | null;

  constructor(
    taskID: string,
    taskText: string,
    taskDate: Date | null,
    taskTime: string | null
  ) {
    this.id = taskID;
    this.text = taskText;
    this.time = taskTime;
    this.date = taskDate;
  }
}

export default Task;
