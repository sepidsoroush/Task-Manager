import React from "react";
import { Card, Text, Box, Heading } from "@chakra-ui/react";

import Task from "../../models/tasks";

const TaskItem: React.FC<{ task: Task }> = (props) => {
  return (
    <Card mb={5} px={5} py={6} minH={100}>
      <Box>
        <Heading fontSize="base" fontWeight="medium" wordBreak="normal">
          {props.task.text}
        </Heading>
        <Text mt={3} fontSize="xs" textColor="gray.600">
          {props.task.text}
        </Text>
      </Box>
    </Card>
  );
};

export default TaskItem;
