import React from "react";
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
  return (
    <Dialog>
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
        <TaskForm actionType="update" taskToUpdate={props.task} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskItem;
