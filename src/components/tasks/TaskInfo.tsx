import React from "react";
import { TextInput, Textarea, Box, Group } from "@mantine/core";

import Task from "../../models/tasks";

const TaskInfo: React.FC<{ task: Task }> = (props) => {
  const dateObj: Date = new Date(props.task.date);
  const newdate: string =
    dateObj.getFullYear() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getDate();
  return (
    <Box>
      <Textarea label="Task" defaultValue={props.task.text} disabled my={10} />
      <Group>
        <TextInput
          label="Date"
          defaultValue={props.task.date && newdate}
          disabled
          mx="auto"
          my={10}
          maw={400}
        />
        <TextInput
          label="Time"
          defaultValue={props.task.time}
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
