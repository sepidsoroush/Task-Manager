import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="text-left">
          <CardTitle className="text-base p-2 md:p-4">
            {props.task.title}
          </CardTitle>
          <CardContent className="text-xs">
            {props.task.description}
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
