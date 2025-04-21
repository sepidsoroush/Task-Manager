import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import DraggableTaskItem from "./DraggableTaskItem";
import { Task, Board } from "@/models";
import { IconType } from "react-icons";

import { useDroppable } from "@dnd-kit/core";

type Props = {
  title: string;
  items: Task[];
  Icon: IconType;
  board: Board;
};

const TasksColumns = ({ title, items, Icon, board }: Props) => {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <Card>
      <CardHeader
        className="rounded-t-lg text-white"
        style={{ backgroundColor: board.color }}
      >
        <CardTitle className="text-base md:text-lg semibold flex flex-row justify-start items-center gap-2">
          <Icon size={18} />
          {title}
          <Badge
            variant="outline"
            className="text-white border-white/20 bg-white/10"
          >
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent
        ref={setNodeRef}
        className="grid gap-2 bg-secondary rounded-b-lg"
      >
        {items.length === 0 ? (
          <div className="text-base text-gray-400 py-2">
            No tasks to display
          </div>
        ) : (
          items.map((item) => (
            <DraggableTaskItem key={item.id} task={item} board={board} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TasksColumns;
