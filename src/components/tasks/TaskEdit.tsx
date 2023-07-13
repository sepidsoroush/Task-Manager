import React, { useRef } from "react";
import {
  ActionIcon,
  Group,
  Button,
  Box,
  Textarea,
  NativeSelect,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { updateAction } from "../../store/tasks-actions";
import { useAppDispatch } from "../../store/hooks";
import { IconClock } from "@tabler/icons-react";
import Task from "../../models/tasks";

const TaskEdit: React.FC<{ task: Task; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();

  const taskTimeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      text: props.task.text,
      date: props.task.date,
      time: props.task.time,
      status: props.task.status,
    },
  });
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedItem: Task = {
      id: props.task.id,
      text: form.values.text,
      date: form.values.date,
      time: form.values.time,
      status: form.values.status,
    };
    dispatch(updateAction(props.task.id, updatedItem));
    form.reset();
    props.onClose();
  };
  return (
    <Box>
      <form>
        <Textarea
          withAsterisk
          label="Task"
          my={10}
          {...form.getInputProps("text")}
        />
        <DateInput
          label="Pick date"
          clearable
          defaultValue={props.task.date || null}
          mx="auto"
          my={10}
          maw={400}
          {...form.getInputProps("date")}
        />
        <TimeInput
          label="Pick Time"
          defaultValue={props.task.time || ""}
          ref={taskTimeInputRef}
          rightSection={
            <ActionIcon onClick={() => taskTimeInputRef.current!.showPicker()}>
              <IconClock size="1rem" stroke={1.5} />
            </ActionIcon>
          }
          maw={400}
          mx="auto"
          my={10}
        />
        <NativeSelect
          label="Status of task"
          data={["To Do", "Doing", "Done"]}
          {...form.getInputProps("status")}
          my={10}
        />
        <Group position="right">
          <Button
            variant="outline"
            color="green"
            compact
            onClick={submitHandler}
          >
            Save
          </Button>
          <Button
            variant="outline"
            color="gray"
            compact
            onClick={props.onClose}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default TaskEdit;
