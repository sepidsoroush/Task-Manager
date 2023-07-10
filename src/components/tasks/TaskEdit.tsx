import React, { useRef } from "react";
import { TextInput, ActionIcon, Group, Button, Box } from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { updateAction } from "../../store/tasks-actions";
import { useAppDispatch } from "../../store/hooks";
import { IconClock } from "@tabler/icons-react";
import Task from "../../models/tasks";

const TaskEdit: React.FC<{ task: Task }> = (props) => {
  const dispatch = useAppDispatch();

  const taskTimeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      text: props.task.text,
      date: props.task.date,
      time: props.task.time,
    },
  });
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedItem: Task = {
      id: props.task.id,
      text: form.values.text,
      date: form.values.date,
      time: form.values.time,
    };
    dispatch(updateAction(props.task.id, updatedItem));
    form.reset();
  };
  return (
    <Box>
      <form onSubmit={submitHandler}>
        <TextInput
          withAsterisk
          label="Task"
          defaultValue={props.task.text}
          my={10}
          {...form.getInputProps("text")}
        />
        <DateInput
          label="Pick date"
          defaultValue={props.task.date}
          clearable
          mx="auto"
          my={10}
          maw={400}
          {...form.getInputProps("date")}
        />
        <TimeInput
          label="Pick Time"
          defaultValue={props.task.time}
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
        <Group position="right">
          <Button variant="subtle" color="green" compact>
            Save
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default TaskEdit;
