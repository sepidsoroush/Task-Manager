import React, { useEffect } from "react";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDataAction } from "../../store/tasks-actions";
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
        <Spinner />
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} p={8}>
          <GridItem>
            <TasksColumns title="To Do" items={todoItems} />
          </GridItem>
          <GridItem>
            <TasksColumns title="Doing" items={doingItems} />
          </GridItem>
          <GridItem>
            <TasksColumns title="Done" items={doneItems} />
          </GridItem>
        </Grid>
      )}
    </>
  );
};

export default Tasks;
