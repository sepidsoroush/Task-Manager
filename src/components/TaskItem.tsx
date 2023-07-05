import React from "react";

const TaskItem: React.FC<{ taskText: string }> = (props) => {
  return <li>{props.taskText}</li>;
};

export default TaskItem;
