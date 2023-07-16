import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import { Grid, Loader, Title } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDataAction } from "../../store/tasks-actions";
import Task from "../../models/tasks";

const Tasks: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector<Task[]>((state) => state.tasks.items);
  const isLoading = useAppSelector<boolean>((state) => state.ui.loading);
  const todoItems: Task[] | null = items.filter(
    (item) => item.status === "To Do"
  );
  const doingItems: Task[] | null = items.filter(
    (item) => item.status === "Doing"
  );
  const doneItems: Task[] | null = items.filter(
    (item) => item.status === "Done"
  );

  useEffect(() => {
    dispatch(setDataAction());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid my={10}>
          <Grid.Col span={4}>
            <Title order={2} mb={8}>
              To do
            </Title>
            {todoItems.map((item) => (
              <TaskItem key={item.id} task={item} />
            ))}
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} mb={8}>
              Doing
            </Title>
            {doingItems.map((item) => (
              <TaskItem key={item.id} task={item} />
            ))}
          </Grid.Col>
          <Grid.Col span={4}>
            <Title order={2} mb={8}>
              Done
            </Title>
            {doneItems.map((item) => (
              <TaskItem key={item.id} task={item} />
            ))}
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default Tasks;
