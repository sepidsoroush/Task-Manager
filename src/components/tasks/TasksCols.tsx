import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import TaskItem from "./TaskItem";
import Task from "@/models/tasks";

const TasksColumns: React.FC<{ items: Task[]; title: string }> = (props) => {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="text-base semibold">
            {props.title} ({props.items.length})
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="grid">
          {props.items.length === 0 ? (
            <div className="text-lg">No tasks to display</div>
          ) : (
            props.items.map((item) => <TaskItem key={item.id} task={item} />)
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default TasksColumns;
