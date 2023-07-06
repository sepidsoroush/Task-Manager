import { useRef } from "react";
import { ActionIcon } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";

const TimePickerInput = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <TimeInput
      label="Pick Time"
      ref={ref}
      rightSection={
        <ActionIcon onClick={() => ref.current!.showPicker()}>
          <IconClock size="1rem" stroke={1.5} />
        </ActionIcon>
      }
      maw={400}
      mx="auto"
    />
  );
};
export default TimePickerInput;
