import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TaskForm from "./TaskForm";
import { Task, Board } from "@/models";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

type Props = {
  task: Task;
  board: Board;
};
const today = new Date();
const TaskItem = ({ task, board }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="text-left hover:shadow-md transition-shadow">
          <CardTitle 
            className="text-base p-2 md:p-4 flex flex-col"
            style={{ borderLeft: `4px solid ${board.color}` }}
          >
            <span>{task.title}</span>
            {task.date && (
              <span
                className={cn(
                  new Date(task.date) < today
                    ? "text-red-500"
                    : "text-neutral-500",
                  "text-xs font-light"
                )}
              >
                {format(new Date(task.date), "MMM d, yyyy")}
              </span>
            )}
          </CardTitle>
          <CardContent className="text-xs">{task.description}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
        </DialogHeader>
        <TaskForm actionType="update" taskToUpdate={task} onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskItem;
