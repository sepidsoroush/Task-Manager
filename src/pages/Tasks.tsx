import React, { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import TasksColumns from "../components/tasks/TasksCols";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setDataAction } from "@/store/tasks-actions";
import Task from "@/models/tasks";

import { IconPlayerPause, IconRun, IconCircleCheck } from "@tabler/icons-react";

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
        <div className="grid grid-cols-1 md:grid-cols-3 items-baseline gap-4 md:gap-2 p-2 md:p-4">
          <TasksColumns
            title="To Do"
            items={todoItems}
            Icon={IconPlayerPause}
          />
          <TasksColumns title="Doing" items={doingItems} Icon={IconRun} />
          <TasksColumns title="Done" items={doneItems} Icon={IconCircleCheck} />
        </div>
      )}
    </>
  );
};

export default Tasks;
