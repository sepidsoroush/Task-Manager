import React, { useState } from "react";
import { Text, Input, Textarea, Box, InputGroup } from "@chakra-ui/react";

import Task from "../../models/tasks";

const TaskInfo: React.FC<{ task: Task }> = (props) => {
  const [newDate, setNewDate] = useState<string>("");
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
      <Box my={5}>
        <Text mb={1} fontSize="sm" color="gray.500" fontWeight="medium">
          Title
        </Text>
        <Textarea defaultValue={props.task.text} />
      </Box>
      <Box mx="auto" my={5}>
        <Text mb={1} fontSize="sm" color="gray.500" fontWeight="medium">
          Current status
        </Text>
        <Input defaultValue={props.task.status} />
      </Box>

      <InputGroup my={5} gap={5}>
        <Box>
          <Text mb={1} fontSize="sm" color="gray.500" fontWeight="medium">
            Date
          </Text>
          <Input defaultValue={props.task.date ? newDate : ""} />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" color="gray.500" fontWeight="medium">
            Time
          </Text>
          <Input defaultValue={props.task.time || ""} />
        </Box>
      </InputGroup>
    </Box>
  );
};

export default TaskInfo;
