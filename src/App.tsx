import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Container from "components/Container";
import TableBuilder from "components/table";

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Container mt={4}>
      <Box my="2rem">
        <TableBuilder />
      </Box>
    </Container>
  </ChakraProvider>
);
