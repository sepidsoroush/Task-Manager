import React from "react";
import { Button, Box, Text, Group } from "@mantine/core";
import { useAppDispatch } from "../../store/hooks";
import { deleteAction } from "../../store/tasks-actions";

const TaskDelete: React.FC<{ id: string; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(deleteAction(props.id));
  };

  return (
    <Box>
      <Text>Are you certain about deleting this task?</Text>
      <Group position="right" spacing="sm" mt={10}>
        <Button color="red" variant="outline" onClick={deleteHandler}>
          Delete
        </Button>
        <Button variant="outline" color="dark" onClick={props.onClose}>
          Cancel
        </Button>
      </Group>
    </Box>
  );
};

export default TaskDelete;
