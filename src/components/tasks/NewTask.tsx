import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import TaskForm from "@/components/tasks/TaskForm";
import { IconPlus } from "@tabler/icons-react";
import { useAppSelector } from "@/store/hooks";

const NewTask: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const activeBoardId = useAppSelector((state) => state.boards.activeBoardId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row gap-1 items-center">
        <IconPlus size={18} />
        <span className="hidden md:inline text-base font-light">
          Add new task
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-base font-normal">Add new task to </span>
            {activeBoardId}
            <span className="text-base font-normal"> board</span>
          </DialogTitle>
          <DialogDescription className="hidden">
            Add a new task to {activeBoardId} board.
          </DialogDescription>
        </DialogHeader>
        <TaskForm actionType="create" onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
