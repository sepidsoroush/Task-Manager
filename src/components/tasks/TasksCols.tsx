import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import TaskItem from "./TaskItem";
import Task from "@/models/tasks";
import { cn } from "@/lib/utils";

const TasksColumns: React.FC<{
  items: Task[];
  title: string;
  color: string;
}> = (props) => {
  return (
    <Card>
      <CardHeader className="text-base md:text-lg semibold flex flex-row justify items-center gap-2">
        <span className={cn("h-4 w-4 rounded-full", `${props.color}`)}></span>
        {props.title} ({props.items.length})
      </CardHeader>
      <Separator />
      <CardContent className="grid mt-2 gap-1">
        {props.items.length === 0 ? (
          <div className="text-base text-gray-400 py-2">
            No tasks to display
          </div>
        ) : (
          props.items.map((item) => <TaskItem key={item.id} task={item} />)
        )}
      </CardContent>
    </Card>
  );
};

export default TasksColumns;
