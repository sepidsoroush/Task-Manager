import React, { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-3 gap-6 p-8">
          <div className="grid-item">
            <TasksColumns title="To Do" items={todoItems} />
          </div>
          <div className="grid-item">
            <TasksColumns title="Doing" items={doingItems} />
          </div>
          <div className="grid-item">
            <TasksColumns title="Done" items={doneItems} />
          </div>
        </div>
      )}
    </>
  );
};

export default Tasks;
