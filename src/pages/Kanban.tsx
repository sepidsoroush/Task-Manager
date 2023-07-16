import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button, Box } from "@mantine/core";
import TaskForm from "../components/tasks/TaskForm";
import Tasks from "../components/tasks/Tasks";

const Kanban = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box>
      <Modal opened={opened} onClose={close} title="Add new task">
        <TaskForm onClose={close} />
      </Modal>
      <Button onClick={open}>Add new task</Button>
      <Tasks />
    </Box>
  );
};

export default Kanban;
