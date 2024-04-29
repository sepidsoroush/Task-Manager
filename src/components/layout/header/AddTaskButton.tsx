import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

const AddTaskButton = () => {
  return (
    <Button
      variant="default"
      onClick={() => {
        console.log("open task modal");
      }}
    >
      <IconPlus />
      <span className="ml-1 hidden md:flex text-base ">Add new task</span>
    </Button>
  );
};

export default AddTaskButton;
