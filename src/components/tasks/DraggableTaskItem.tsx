import { useDraggable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import { Task, Board } from "@/models";

const DraggableTaskItem = ({ task, board }: { task: Task; board: Board }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: transform ? 50 : undefined,
    touchAction: "none",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskItem
        task={task}
        board={board}
        dragRef={setNodeRef}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
};

export default DraggableTaskItem;
