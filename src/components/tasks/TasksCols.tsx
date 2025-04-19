import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import TaskItem from "./TaskItem";
import { Task } from "@/models";
import { IconType } from "react-icons";

type Props = {
  title: string;
  items: Task[];
  Icon: IconType;
};

const TasksColumns = ({ title, items, Icon }: Props) => {
  return (
    <Card>
      <CardHeader className="bg-primary text-secondary rounded-t-lg">
        <CardTitle className="text-base md:text-lg semibold flex flex-row justify-start items-center gap-2">
          <Icon size={18} />
          {title}
          <Badge variant="outline" className="text-secondary">
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-2 bg-secondary rounded-b-lg">
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
