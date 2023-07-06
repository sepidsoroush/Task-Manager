import { useDisclosure } from "@mantine/hooks";
import { Modal, Group, Button } from "@mantine/core";
import TaskForm from "../components/tasks/TaskForm";
import Tasks from "../components/tasks/Tasks";

const Kanban = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <div>
        <Modal opened={opened} onClose={close} title="Add new task">
          <TaskForm />
        </Modal>

        <Group position="center">
          <Button onClick={open}>Add new task</Button>
        </Group>
      </div>

      <Tasks />
    </div>
  );
};

export default Kanban;
