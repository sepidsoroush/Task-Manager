import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TaskInput = () => {
  const [value, setValue] = useState("");
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Task title</Label>
      <Input
        value={value}
        placeholder="+ Add Task"
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </div>
  );
};
export default TaskInput;
