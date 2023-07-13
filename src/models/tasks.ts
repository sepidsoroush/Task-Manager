class Task {
  id: string;
  text: string;
  date: Date | null;
  time: string | null;
  status: string;

  constructor(
    taskID: string,
    taskText: string,
    taskDate: Date | null,
    taskTime: string | null,
    taskStatus: string
  ) {
    this.id = taskID;
    this.text = taskText;
    this.time = taskTime;
    this.date = taskDate;
    this.status = taskStatus;
  }
}

export default Task;
