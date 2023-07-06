import React, { useContext } from "react";
import { TasksContext } from "../../store/tasks-context";
import TaskItem from "./TaskItem";

const Tasks: React.FC = () => {
  const contextValue = useContext(TasksContext);
  console.log(contextValue.items);

  return (
    <ul>
      {contextValue.items.map((item) => (
        <TaskItem key={item.id} taskText={item.text} />
      ))}
    </ul>
  );
};

export default Tasks;
