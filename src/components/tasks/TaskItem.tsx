import React, { useState } from "react";
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

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card className="text-left">
          <CardTitle className="text-base p-2 md:p-4 flex flex-col">
            <span>{task.title}</span>
            <span className="text-xs font-light text-gray-500">
              {task.date ? format(task.date, "PPP") : null}
            </span>
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
