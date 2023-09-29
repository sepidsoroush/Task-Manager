import React from "react";
import { Card, CardHeader, CardBody, Text } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import Task from "../../models/tasks";

const TasksColumns: React.FC<{ items: Task[]; title: string }> = (props) => {
  return (
    <Card minH="full" backgroundColor="transparent" shadow="none">
      <CardHeader py={0} my={0}>
        <Text size="base" fontWeight="semibold" color="gray.500">
          {props.title}
        </Text>
      </CardHeader>
      <CardBody>
        {props.items.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No tasks to display
          </Text>
        ) : (
          props.items.map((item) => <TaskItem key={item.id} task={item} />)
        )}
      </CardBody>
    </Card>
  );
};

export default TasksColumns;
