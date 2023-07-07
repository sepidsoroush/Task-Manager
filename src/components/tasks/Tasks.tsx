import React, { useContext } from "react";
import { TasksContext } from "../../store/tasks-context";
import TaskItem from "./TaskItem";
import { Flex } from "@mantine/core";

const Tasks: React.FC = () => {
  const contextValue = useContext(TasksContext);
  console.log(contextValue.items);

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {contextValue.items.map((item) => (
        <TaskItem key={item.id} taskText={item.text} taskDate={item.date} />
      ))}
    </Flex>
  );
};

export default Tasks;
