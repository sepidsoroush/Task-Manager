import React, { useState } from "react";
import { TextInput, Textarea, Box, Group } from "@mantine/core";

import Task from "../../models/tasks";

const TaskInfo: React.FC<{ task: Task }> = (props) => {
  const [newDate, setNewDate] = useState("");
  const dateObj: Date | null = props.task.date;
  if (dateObj) {
    setNewDate(
      dateObj.getFullYear() +
        "/" +
        (dateObj.getMonth() + 1) +
        "/" +
        dateObj.getDate()
    );
  }
  return (
    <Box>
      <Textarea label="Task" defaultValue={props.task.text} disabled my={10} />
      <TextInput
        label="Status"
        defaultValue={props.task.status}
        disabled
        mx="auto"
        my={10}
        maw={400}
      />
      <Group>
        <TextInput
          label="Date"
          defaultValue={props.task.date ? newDate : ""}
          disabled
          mx="auto"
          my={10}
          maw={400}
        />
        <TextInput
          label="Time"
          defaultValue={props.task.time || ""}
          disabled
          maw={400}
          mx="auto"
          my={10}
        />
      </Group>
    </Box>
  );
};

export default TaskInfo;
