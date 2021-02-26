import * as React from "react";
import { HStack, Button, Text } from "@chakra-ui/react";

const TableHeader: React.FC = () => {
  return (
    <HStack px="1rem" shadow="md" py=".7rem" justify="space-between">
      <Text fontSize="lg" fontWeight="medium">
        Subscriptions List
      </Text>
      <HStack>
        <Button variant="outline" mr="1rem">
          Import
        </Button>
        <Button variant="outline">Export</Button>
      </HStack>
    </HStack>
  );
};

export default TableHeader;
