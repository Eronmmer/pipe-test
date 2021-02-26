import * as React from "react";
import {
  ButtonProps,
  Button as ChakraButton,
  forwardRef,
} from "@chakra-ui/react";

export const FilterButton: React.FC<ButtonProps> = forwardRef(
  (props: ButtonProps, ref) => {
    return (
      <ChakraButton
        variant="outline"
        size="xs"
        background="#fff"
        _hover={{ background: "#fff" }}
        px="1rem"
        {...props}
        ref={ref}
      />
    );
  },
);
