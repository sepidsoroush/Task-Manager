import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IconPlus } from "@tabler/icons-react";
import BoardForm from "./BoardForm";

const NewBoard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex flex-row gap-1 items-center">
        <IconPlus size={18} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new board</DialogTitle>
        </DialogHeader>
        <BoardForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewBoard;
