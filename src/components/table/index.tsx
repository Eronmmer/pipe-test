import * as React from "react";
import { Flex } from "@chakra-ui/react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const TableBuilder: React.FC = () => {
  return (
    <Flex
      direction="column"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.3),
     	0 10px 0 -5px #eee,
     	0 10px 1px -4px rgba(0, 0, 0, 0.15),
    	0 20px 0 -10px #eee,
     	0 20px 1px -9px rgba(0, 0, 0, 0.15)"
      minHeight="90vh"
      minWidth="100%"
    >
      <TableHeader />
      <TableBody />
    </Flex>
  );
};

export default TableBuilder;
