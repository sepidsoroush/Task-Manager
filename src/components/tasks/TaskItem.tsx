import React, { useState } from "react";
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
// import TaskEdit from "./TaskEdit";
import TaskDelete from "./TaskDelete";

const TaskItem: React.FC<{ task: Task }> = (props) => {
  const [viewOpened, viewHandlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);
  const [editOpened, editHandlers] = useDisclosure(false);

  // const [newDate, setNewDate] = useState<string>("");
  // const dateObj: Date | null = props.task.date;
  // if (dateObj) {
  //   setNewDate(
  //     dateObj.getFullYear() +
  //       "/" +
  //       (dateObj.getMonth() + 1) +
  //       "/" +
  //       dateObj.getDate()
  //   );
  // }

  return (
    <Card miw={150} mb={10} shadow="sm" p="sm" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Menu withinPortal position="bottom-start" shadow="sm">
            <Menu.Target>
              <ActionIcon size="xs" variant="light" radius="sm">
                <IconDotsVertical size="1rem" stroke={1.5} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<IconEye size={rem(14)} />}
                onClick={viewHandlers.open}
              >
                Preview
              </Menu.Item>
              <Menu.Item
                icon={<IconPencil size={rem(14)} />}
                onClick={editHandlers.open}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                icon={<IconTrash size={rem(14)} />}
                onClick={deleteHandlers.open}
                color="red"
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          {props.task.date && (
            <Badge color="pink" variant="light" size="xs">
              {props.task.date.toLocaleString()}
            </Badge>
          )}
        </Group>
        <Modal
          opened={viewOpened}
          onClose={viewHandlers.close}
          title="Task's info"
        >
          <TaskInfo task={props.task} />
        </Modal>
        <Modal
          opened={deleteOpened}
          onClose={deleteHandlers.close}
          withCloseButton={false}
        >
          <TaskDelete id={props.task.id} onClose={deleteHandlers.close} />
        </Modal>
        <Modal
          opened={editOpened}
          onClose={editHandlers.close}
          title="Task's info"
        >
          {/* <TaskEdit task={props.task} onClose={editHandlers.close} /> */}
        </Modal>
      </Card.Section>
      <Text color="dimmed" size="sm" lineClamp={3} my="xs">
        {props.task.text}
      </Text>
    </Card>
  );
};

export default TaskItem;
