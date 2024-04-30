import React from "react";
import { Button } from "@/components/ui/button";
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
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="default" className="gap-1">
          <IconPlus />
          <span className="hidden md:inline text-base">Add new task</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>
        <TaskForm actionType="create" />
      </DialogContent>
    </Dialog>
  );
};

export default NewTask;
