import * as React from "react";
import { Box, Text, Flex, HStack, VStack } from "@chakra-ui/react";
import camelCaseToText from "utils/camelToTextCase";
import { StateContext } from "context/StateProvider";

const Columns: React.FC = () => {
  const { filteredData, selectedColumns } = React.useContext(StateContext);
  return (
    <Box overflowX="auto" flex={1} backgroundColor="#fff">
      {selectedColumns.length < 1 ? (
        <Flex height="100%" justify="center" align="center">
          <Text padding="1rem" fontSize="lg" fontWeight="bold">
            Please select at least one column from the edit panel on the left
          </Text>
        </Flex>
      ) : (
        <Box minWidth="700px">
          <HStack padding=".7rem 1rem" backgroundColor="#f8f9fb">
            {selectedColumns.map((column, key) => (
              <Text
                textAlign="center"
                flexBasis="14%"
                fontWeight="bold"
                key={key}
              >
                {column !== "mrr"
                  ? camelCaseToText(column)
                  : column.toUpperCase()}
              </Text>
            ))}
          </HStack>
          <HStack padding=".7rem 1rem">
            {selectedColumns.map((column, key) => (
              <VStack
                flexBasis="14%"
                marginTop=".6rem"
                spacing="1.5rem"
                key={key}
              >
                {filteredData
                  .map(
                    (e) => e[column === "invoiceNumber" ? "invoiceNo" : column],
                  )
                  .map((elem, key) => (
                    <Text key={key}>{elem}</Text>
                  ))}
              </VStack>
            ))}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default Columns;
