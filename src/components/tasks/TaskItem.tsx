import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TaskForm from "./TaskForm";
import Task from "@/models/tasks";

const TaskItem: React.FC<{ task: Task }> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Card>
          <CardHeader>
            <div className="text-base font-medium break-normal">
              {props.task.title}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xs mt-3">{props.task.description}</div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task's info</DialogTitle>
        </DialogHeader>
        <TaskForm
          actionType="update"
          taskToUpdate={props.task}
          onOpenChange={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TaskItem;
