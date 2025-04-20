import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconDots } from "@tabler/icons-react";
import BoardForm from "./BoardForm";
import { useAppSelector } from "@/store/hooks";

const EditBoard: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const activeBoardId = useAppSelector((state) => state.boards.activeBoardId);
  const activeBoard = useAppSelector((state) =>
    state.boards.items.find((b) => b.id === activeBoardId)
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconDots size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <span className="text-base font-normal">Edit board: </span>
            {activeBoard?.title}
          </DialogTitle>
          <DialogDescription className="hidden">
            Edit board settings
          </DialogDescription>
        </DialogHeader>
        <BoardForm onOpenChange={setOpen} actionType="update" />
      </DialogContent>
    </Dialog>
  );
};

export default EditBoard;
