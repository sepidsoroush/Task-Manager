import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "@/components/tasks/TaskForm";
import { IconPlus } from "@tabler/icons-react";

const NewTask: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

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
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>
        <TaskForm actionType="create" onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
