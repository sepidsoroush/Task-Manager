import React from "react";
import TaskItem from "./TaskItem";
import Task from "../../models/tasks";

const Tasks: React.FC<{ items: Task[] }> = (props) => {
  return (
    <ul>
      {props.items.map((item) => (
        <TaskItem key={item.id} taskText={item.text} />
      ))}
    </ul>
  );
};

export default Tasks;
