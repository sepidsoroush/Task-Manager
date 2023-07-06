import { useState } from "react";
import { TextInput } from "@mantine/core";

const TaskInput = () => {
  const [value, setValue] = useState("");
  return (
    <TextInput
      value={value}
      placeholder="+ Add Task"
      label="Task title"
      withAsterisk
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
};
export default TaskInput;
