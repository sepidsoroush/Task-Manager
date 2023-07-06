import { TextInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useContext, useRef } from "react";
import { TasksContext } from "../../store/tasks-context";
import { DateInput } from "@mantine/dates";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import Task from "../../models/tasks";

const TaskForm: React.FC = () => {
  const contextValue = useContext(TasksContext);
  const taskTextInputRef = useRef<HTMLInputElement>(null);
  const taskDateInputRef = useRef<HTMLInputElement>(null);
  const taskTimeInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    initialValues: {
      text: "",
      date: "",
      time: "",
    },

    // validate: {
    //   text: (enteredText) =>
    //     enteredText.trim().length === 0 ? null : "Invalid title",
    // },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: Task = {
      id: new Date().toISOString(),
      text: taskTextInputRef.current!.value,
      date: taskDateInputRef.current!.value,
      time: taskTimeInputRef.current!.value,
    };

    contextValue.addItems([newItem]);
    form.reset();
  };

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={submitHandler}>
        <TextInput
          withAsterisk
          label="Task"
          placeholder="+ Add task"
          ref={taskTextInputRef}
          my={10}
          {...form.getInputProps("text")}
        />
        <DateInput
          label="Pick date"
          placeholder="Pick date"
          ref={taskDateInputRef}
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
