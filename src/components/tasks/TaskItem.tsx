import React from "react";
import {
  rem,
  Card,
  Text,
  Badge,
  ActionIcon,
  Modal,
  Group,
  Menu,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconTrash,
  IconEye,
  IconPencil,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Task from "../../models/tasks";
import TaskInfo from "./TaskInfo";

const TaskItem: React.FC<{ task: Task }> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const dateObj: Date = new Date(props.task.date);
  const newdate: string =
    dateObj.getFullYear() +
    "/" +
    (dateObj.getMonth() + 1) +
    "/" +
    dateObj.getDate();

  return (
    <Card w={150} shadow="sm" p="sm" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Menu withinPortal position="bottom-start" shadow="sm">
            <Menu.Target>
              <ActionIcon size="xs" variant="light" radius="sm">
                <IconDotsVertical size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item icon={<IconEye size={rem(14)} />} onClick={open}>
                Preview
              </Menu.Item>
              <Menu.Item icon={<IconPencil size={rem(14)} />}>Edit</Menu.Item>
              <Menu.Item icon={<IconTrash size={rem(14)} />} color="red">
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {props.task.date && (
            <Badge color="pink" variant="light" size="xs">
              {newdate}
            </Badge>
          )}
        </Group>
        <Modal opened={opened} onClose={close} title="Task's info">
          <TaskInfo task={props.task} />
        </Modal>
      </Card.Section>
      <Text color="dimmed" size="sm" lineClamp={3} my="xs">
        {props.task.text}
      </Text>
    </Card>
  );
};

export default TaskItem;
