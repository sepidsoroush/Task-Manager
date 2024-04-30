import React, { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import TasksColumns from "./TasksCols";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDataAction } from "@/store/tasks-actions";
import Task from "@/models/tasks";

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
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2 p-2 md:p-4">
          <TasksColumns title="To Do" items={todoItems} color="bg-blue-300" />
          <TasksColumns
            title="Doing"
            items={doingItems}
            color="bg-violet-300"
          />
          <TasksColumns title="Done" items={doneItems} color="bg-green-300" />
        </div>
      )}
    </>
  );
};

export default Tasks;
