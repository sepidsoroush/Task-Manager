class Task {
  id: string;
  text: string;
  date: string;
  time: string;

  constructor(
    taskID: string,
    taskText: string,
    taskDate: string,
    taskTime: string
  ) {
    this.id = taskID;
    this.text = taskText;
    this.time = taskTime;
    this.date = taskDate;
  }
}

export default Task;
