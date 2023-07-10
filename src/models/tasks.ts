class Task {
  id: string;
  text: string;
  date: Date;
  time: string;

  constructor(
    taskID: string,
    taskText: string,
    taskDate: Date,
    taskTime: string
  ) {
    this.id = taskID;
    this.text = taskText;
    this.time = taskTime;
    this.date = taskDate;
  }
}

export default Task;
