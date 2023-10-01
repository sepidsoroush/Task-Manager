import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Spacer,
  Box,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import NewTask from "./NewTask";
import Task from "../../models/tasks";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@chakra-ui/react";

const TasksColumns: React.FC<{ items: Task[]; title: string }> = (props) => {
  const {
    isOpen: isOpenNew,
    onOpen: onOpenNew,
    onClose: onCloseNew,
  } = useDisclosure();

  return (
    <>
      <Card minH="full" shadow="none" backgroundColor="transparent">
        <CardHeader
          py={2}
          my={0}
          backgroundColor="teal"
          borderRadius="10px 10px 0 0 "
        >
          <Flex>
            <Text size="base" fontWeight="semibold" color="white">
              {props.title}
            </Text>
            <Spacer />
            <IconButton
              display={"flex"}
              onClick={onOpenNew}
              outline="none"
              color={"white"}
              backgroundColor={"transparent"}
              _hover={{
                backgroundColor: "gray.100",
                color: "teal",
                outline: "none",
              }}
              aria-label="open menu"
              icon={<IconPlus />}
            />
          </Flex>
        </CardHeader>
        <CardBody backgroundColor="white">
          {props.items.length === 0 ? (
            <Text fontSize="lg" color="gray.500">
              No tasks to display
            </Text>
          ) : (
            props.items.map((item) => <TaskItem key={item.id} task={item} />)
          )}
        </CardBody>
      </Card>
      <Modal isOpen={isOpenNew} onClose={onCloseNew}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NewTask status={props.title} onClose={onCloseNew} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TasksColumns;
