import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Box } from "@mantine/core";
import TaskForm from "../components/tasks/TaskForm";
import Tasks from "../components/tasks/Tasks";

const Kanban = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Add new task">
        <TaskForm />
      </Modal>
      <Button onClick={open}>Add new task</Button>

      <Group my={10}>
        <Tasks />
      </Group>
    </Box>
  );
};

export default Kanban;
