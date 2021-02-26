import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

const Container: React.FC<BoxProps> = (props: BoxProps) => {
  return (
    <Box
      px={{ base: "1rem", md: "1.4rem", lg: ".5rem" }}
      maxWidth={["720px", "720px", "720px", "960px", "1200px"]}
      mx="auto"
      {...props}
    />
  );
};

export default Container;
