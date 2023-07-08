import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { Flex, Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDataAction } from "../../store/tasks-actions";

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.tasks.items);
  const isLoading = useAppSelector((state) => state.ui.loading);

  useEffect(() => {
    dispatch(setDataAction());
  }, []);

  return (
    <Flex
      gap="sm"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
    >
      {isLoading ? (
        <Loader />
      ) : (
        items.map((item) => (
          <TaskItem key={item.id} taskText={item.text} taskDate={item.date} />
        ))
      )}
    </Flex>
  );
};

export default Tasks;
