import { useRef } from "react";

const NewTask: React.FC<{ onAddTask: (text: string) => void }> = (props) => {
  const taskTextInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = taskTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }
    props.onAddTask(enteredText);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Task text</label>
      <input type="text" id="text" ref={taskTextInputRef} />
      <button>Add Task</button>
    </form>
  );
};

export default NewTask;
