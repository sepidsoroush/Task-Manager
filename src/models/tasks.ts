class Task {
  id: string;
  text: string;
  date: string | undefined;
  time: string | undefined;
  status: string;

  constructor(
    taskID: string,
    taskText: string,
    taskDate: string | undefined,
    taskTime: string | undefined,
    taskStatus: string
  ) {
    this.id = taskID;
    this.text = taskText;
    this.time = taskTime;
    this.date = taskDate;
    this.status = taskStatus;
  }
}

export const emptyTask = {
  id: "",
  text: "",
  date: undefined,
  time: "",
  status: "",
};

export default Task;
