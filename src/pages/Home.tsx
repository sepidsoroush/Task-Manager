import { useState } from "react";
import NewTask from "../components/tasks/NewTask";
import Tasks from "../components/tasks/Tasks";
import Task from "../models/tasks";

function Homepage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = (taskText: string) => {
    const newTask = new Task(taskText);

    setTasks((prevTasks) => {
      return prevTasks.concat(newTask);
    });
  };

  return (
    <div>
      <h1>Tasks list</h1>
      <NewTask onAddTask={addTaskHandler} />
      <Tasks items={tasks} />
    </div>
  );
}

export default Homepage;
