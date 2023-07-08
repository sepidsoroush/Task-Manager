import React from "react";
import { Card, Text, Badge, ActionIcon, Modal, Group } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const TaskItem: React.FC<{ taskText: string; taskDate: string }> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Card w={150} shadow="sm" p="sm" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <ActionIcon onClick={open} variant="light" size="xs" radius="sm">
            <IconDotsVertical size="1rem" stroke={1.5} />
          </ActionIcon>
          <Modal opened={opened} onClose={close} title="Task's info">
            Info
          </Modal>
          {props.taskDate && (
            <Badge color="pink" variant="light" size="xs">
              {props.taskDate}
            </Badge>
          )}
        </Group>
      </Card.Section>
      <Text color="dimmed" size="sm" lineClamp={3} my="xs">
        {props.taskText}
      </Text>
    </Card>
  );
};

export default TaskItem;
