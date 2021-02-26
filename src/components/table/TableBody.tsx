import * as React from "react";
import { HStack, Flex } from "@chakra-ui/react";
import EditPanel from "./EditPanel";
import Columns from "./Columns";

const TableBody: React.FC = () => {
  return (
    <Flex flexDirection="column" flex={1} marginTop="1px">
      <HStack alignItems="stretch" flex={1} spacing="0">
        <EditPanel />
        <Columns />
      </HStack>
    </Flex>
  );
};

export default TableBody;
