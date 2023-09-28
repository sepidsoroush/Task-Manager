import { Box, useColorModeValue } from "@chakra-ui/react";
import Tasks from "../components/tasks/Tasks";

const Kanban = () => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
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
