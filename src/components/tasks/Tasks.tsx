import React from "react";
import TaskItem from "./TaskItem";
import { Flex } from "@mantine/core";
import { useAppSelector } from "../../store/hooks";

const Tasks: React.FC = () => {
  const items = useAppSelector((state) => state.tasks.items);

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {items.map((item) => (
        <TaskItem key={item.id} taskText={item.text} taskDate={item.date} />
      ))}
    </Flex>
  );
};

export default Tasks;
