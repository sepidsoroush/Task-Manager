import React, { useState, createContext } from "react";
import Task from "../models/tasks";

type TasksContextObj = {
  items: Task[];
  addItems: (item: Task[]) => void;
  removeItem: (id: string) => void;
};
type BaseLayoutProps = {
  children?: React.ReactNode;
};

export const TasksContext = createContext<TasksContextObj>({
  items: [],
  addItems: () => {},
  removeItem: () => {},
});

const TasksContextProvider: React.FC<BaseLayoutProps> = (props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = (newItem: Task[]) => {
    setTasks((prevState) => {
      return prevState.concat(newItem);
    });
  };

  const removeTaskHandler = (taskId: string) => {
    setTasks((prevState) => {
      return prevState.filter((item) => item.id !== taskId);
    });
  };

  const contextValue: TasksContextObj = {
    items: tasks,
    addItems: addTaskHandler,
    removeItem: removeTaskHandler,
  };

  return (
    <TasksContext.Provider value={contextValue}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
