import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import TaskItem from "./TaskItem";
import Task from "@/models/tasks";
import { IconType } from "react-icons";

type Props = {
  title: string;
  items: Task[];
  Icon: IconType;
};

const TasksColumns = ({ title, items, Icon }: Props) => {
  return (
    <Card>
      <CardHeader className="text-base md:text-lg semibold flex flex-row justify-start items-center gap-2 border-t-6 sticky top-0 z-10">
        <Icon size={18} />
        {title} <Badge variant="outline">{items.length}</Badge>
      </CardHeader>
      <Separator />
      <CardContent className=" overflow-y-auto grid gap-2 bg-secondary">
        {items.length === 0 ? (
          <div className="text-base text-gray-400 py-2">
            No tasks to display
          </div>
        ) : (
          items.map((item) => <TaskItem key={item.id} task={item} />)
        )}
      </CardContent>
    </Card>
  );
};

export default TasksColumns;
