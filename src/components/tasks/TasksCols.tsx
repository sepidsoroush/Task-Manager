import React from "react";
import { Title, Card, Text } from "@mantine/core";
import TaskItem from "./TaskItem";
import Task from "../../models/tasks";

const TasksColumns: React.FC<{ items: Task[]; title: string }> = (props) => {
  return (
    <Card>
      <Card.Section withBorder inheritPadding py={5} my={10}>
        <Title order={2} color="gray">
          {props.title}
        </Title>
      </Card.Section>
      {props.items.length === 0 ? (
        <Text fz="lg" color="gray">
          No tasks to display
        </Text>
      ) : (
        props.items.map((item) => <TaskItem key={item.id} task={item} />)
      )}
    </Card>
  );
};

export default TasksColumns;
