import { Box, useColorModeValue } from "@chakra-ui/react";
import Tasks from "../components/tasks/Tasks";

const Kanban = () => {
  return (
    <Box
      bg={useColorModeValue("#f4f7fd", "#20212c")}
      w="full"
      h="full"
      px={6}
      pos="fixed"
    >
      <Tasks />
    </Box>
  );
};

export default Kanban;
