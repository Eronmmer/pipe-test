import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/react";
import StateProvider from "context/StateProvider";
import { App } from "./App";

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <>
      <ColorModeScript />
      <StateProvider>
        <App />
      </StateProvider>
    </>,
    div,
  );
});
