import React from "react";
import TaskItem from "./TaskItem";

const Tasks: React.FC = () => {
  const tasksList = [
    { id: 1, text: "Doing dishes" },
    { id: 2, text: "Buying groceries" },
  ];
  return (
    <ul>
      {tasksList.map((item) => (
        <TaskItem key={item.id} taskText={item.text} />
      ))}
    </ul>
  );
};

export default Tasks;
