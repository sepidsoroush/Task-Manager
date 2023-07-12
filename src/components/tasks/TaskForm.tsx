import { useRef } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { addAction } from "../../store/tasks-actions";
import { DateInput } from "@mantine/dates";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import Task from "../../models/tasks";
import { useAppDispatch } from "../../store/hooks";

const TaskForm: React.FC<{ onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const taskTimeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      text: "",
      date: null,
      time: null,
    },

    // validate: {
    //   text: (enteredText) =>
    //     enteredText.trim().length === 0 ? null : "Invalid title",
    // },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: Task = {
      id: new Date().getTime().toString(),
      text: form.values.text,
      date: form.values.date !== null ? new Date(form.values.date) : null,
      time: form.values.time,
    };

    dispatch(addAction(newItem));
    form.reset();
    props.onClose;
  };

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={submitHandler}>
        <TextInput
          withAsterisk
          label="Task"
          placeholder="+ Add task"
          my={10}
          {...form.getInputProps("text")}
        />
        <DateInput
          label="Pick date"
          placeholder="Pick date"
          clearable
          mx="auto"
          my={10}
          maw={400}
          {...form.getInputProps("date")}
        />
        <TimeInput
          label="Pick Time"
          ref={taskTimeInputRef}
          rightSection={
            <ActionIcon onClick={() => taskTimeInputRef.current!.showPicker()}>
              <IconClock size="1rem" stroke={1.5} />
            </ActionIcon>
          }
          maw={400}
          mx="auto"
          my={10}
          {...form.getInputProps("time")}
        />
        <Group position="right" mt={10}>
          <Button type="submit">Add Task</Button>
        </Group>
      </form>
    </Box>
  );
};
export default TaskForm;
