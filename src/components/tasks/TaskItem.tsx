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
import Task from "@/models/tasks";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

type Props = {
  task: Task;
};
const today = new Date();
const TaskItem = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="text-left">
          <CardTitle className="text-base p-2 md:p-4 flex flex-col">
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
                {format(task.date, "PPP")}
              </span>
            )}
          </CardTitle>
          <CardContent className="text-xs">{task.description}</CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task's info</DialogTitle>
        </DialogHeader>
        <TaskForm
          actionType="update"
          taskToUpdate={task}
          onOpenChange={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskItem;
