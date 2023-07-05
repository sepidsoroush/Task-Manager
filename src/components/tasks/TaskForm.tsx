import React, { useRef, useContext } from "react";
import { TasksContext } from "../../store/tasks-context";

const TaskForm: React.FC = () => {
  const contextValue = useContext(TasksContext);
  const taskTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = taskTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }
    contextValue.addItems(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Task text</label>
      <input type="text" id="text" ref={taskTextInputRef} />
      <button>Add Task</button>
    </form>
  );
};

export default TaskForm;
