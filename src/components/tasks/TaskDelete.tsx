import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "../../store/hooks";
import { deleteAction } from "../../store/tasks-actions";

const TaskDelete: React.FC<{ id: string; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(deleteAction(props.id));
  };

  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you certain about deleting this task?</DialogHeader>
        <DialogFooter>
          <Button color="red" variant="outline" onClick={deleteHandler}>
            Delete
          </Button>
          <Button variant="outline" color="gray" onClick={props.onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDelete;
