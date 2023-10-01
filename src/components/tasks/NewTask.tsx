import { useState, ChangeEvent } from "react";
import { Button, FormControl, FormLabel, Input, Flex } from "@chakra-ui/react";
import Task, { emptyTask } from "../../models/tasks";
import { useAppDispatch } from "../../store/hooks";
import { addAction } from "../../store/tasks-actions";

const NewTask: React.FC<{ status: string; onClose: () => void }> = (props) => {
  const dispatch = useAppDispatch();
  const [formValue, setFormValue] = useState<Task>(emptyTask);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const newItem: Task = {
      id: new Date().getTime().toString(),
      text: formValue.text,
      date:
        formValue.date !== undefined
          ? new Date(formValue.date).toISOString().slice(0, 10)
          : undefined,
      time: formValue.time,
      status: props.status,
    };

    dispatch(addAction(newItem));
    props.onClose();
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue(
      (prevState): Task => ({
        ...prevState,
        text: event.target.value,
      })
    );
  };

  const dateChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue(
      (prevState): Task => ({
        ...prevState,
        date: event.target.value,
      })
    );
  };

  const timeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue(
      (prevState): Task => ({
        ...prevState,
        time: event.target.value,
      })
    );
  };

  return (
    <>
      <FormControl mr="5%">
        <FormLabel htmlFor="task" fontWeight={"normal"}>
          Task
        </FormLabel>
        <Input
          id="task"
          placeholder="Task"
          value={formValue?.text}
          onChange={inputChangeHandler}
          required
        />
      </FormControl>
      <Flex gap={5} mt="2%">
        <FormControl>
          <FormLabel htmlFor="date" fontWeight={"normal"}>
            Pick date
          </FormLabel>
          <Input
            placeholder="Select Date"
            id="date"
            size="md"
            type="date"
            value={formValue.date}
            onChange={dateChangeHandler}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="time" fontWeight={"normal"}>
            Pick time
          </FormLabel>
          <Input
            placeholder="Select Time"
            id="time"
            size="md"
            type="time"
            value={formValue.time}
            onChange={timeChangeHandler}
          />
        </FormControl>
      </Flex>

      <Flex alignItems="center" justifyContent={"flex-end"} my={5}>
        <Button
          w="7rem"
          colorScheme="teal"
          variant="solid"
          onClick={submitHandler}
        >
          Add Task
        </Button>
      </Flex>
    </>
  );
};
export default NewTask;
