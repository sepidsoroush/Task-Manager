import React from "react";
import {
  Card,
  Text,
  Box,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import TaskInfo from "./TaskInfo";
import TaskDelete from "./TaskDelete";
import Task from "../../models/tasks";
import { useAppDispatch } from "../../store/hooks";
import { updateAction } from "../../store/tasks-actions";

const TaskItem: React.FC<{ task: Task }> = (props) => {
  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const dispatch = useAppDispatch();

  const submitHandler = (updatedItem: Task) => {
    dispatch(updateAction(props.task.id, updatedItem));
    onCloseView();
  };

  const deleteButtonHandler: () => void = () => {
    onCloseView();
    onOpenDelete();
  };

  return (
    <>
      <Card
        mb={5}
        px={5}
        py={6}
        minH={100}
        onClick={onOpenView}
        cursor="pointer"
      >
        <Box>
          <Heading fontSize="base" fontWeight="medium" wordBreak="normal">
            {props.task.text}
          </Heading>
          <Text mt={3} fontSize="xs" textColor="gray.600">
            {props.task.text}
          </Text>
        </Box>
      </Card>
      <Modal isOpen={isOpenView} onClose={onCloseView}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task's info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskInfo task={props.task} />
          </ModalBody>
          <ModalFooter gap={5}>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={deleteButtonHandler}
            >
              Delete
            </Button>
            <Button colorScheme="teal" onClick={submitHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <TaskDelete id={props.task.id} onClose={onCloseDelete} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskItem;
