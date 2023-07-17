import React, { useEffect } from "react";
import { Grid, Loader, Title } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDataAction } from "../../store/tasks-actions";
import TaskItem from "./TaskItem";
import TasksColumns from "./TasksCols";
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
            <TasksColumns title="To Do" items={todoItems} />
          </Grid.Col>
          <Grid.Col span={4}>
            <TasksColumns title="Doing" items={doingItems} />
          </Grid.Col>
          <Grid.Col span={4}>
            <TasksColumns title="Done" items={doneItems} />
          </Grid.Col>
        </Grid>
      )}
    </>
  );
};

export default Tasks;
