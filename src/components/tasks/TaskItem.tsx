import React from "react";
import { Card, Text, Badge } from "@mantine/core";

const TaskItem: React.FC<{ taskText: string; taskDate: string }> = (props) => {
  return (
    <Card w={150} shadow="sm" p="sm" radius="md" withBorder>
      {props.taskDate && (
        <Badge color="pink" variant="light" size="xs">
          {props.taskDate}
        </Badge>
      )}
      <Text color="dimmed" size="sm" my="xs">
        {props.taskText}
      </Text>
    </Card>
  );
};

export default TaskItem;
