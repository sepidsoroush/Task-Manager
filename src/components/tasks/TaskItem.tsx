import { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconGripVertical } from "@tabler/icons-react";
import TaskForm from "./TaskForm";
import { Task, Board } from "@/models";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  task: Task;
  board: Board;
  dragRef?: (node: HTMLElement | null) => void;
  dragAttributes?: any;
  dragListeners?: any;
};

const today = new Date();

const TaskItem = ({
  task,
  board,
  dragRef,
  dragAttributes,
  dragListeners,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="text-left hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2 p-2">
            <div
              ref={dragRef}
              {...dragAttributes}
              {...dragListeners}
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                size="icon"
                className="cursor-grab active:cursor-grabbing select-none"
              >
                <IconGripVertical size={18} />
              </Button>
            </div>
            <CardTitle
              className="text-base flex flex-row items-center gap-2 cursor-default select-none py-1"
              style={{ borderLeft: `4px solid ${board.color}` }}
            >
              <span className="ml-1">{task.title}</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="text-xs p-2 select-none">
            {task.date && (
              <div
                className={cn(
                  new Date(task.date) < today
                    ? "text-red-500"
                    : "text-neutral-500",
                  "text-xs font-light"
                )}
              >
                {format(new Date(task.date), "MMM d, yyyy")}
              </div>
            )}
            {task.description}
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
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
