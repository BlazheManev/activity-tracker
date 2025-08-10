import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { ActivityProvider } from "./context/ActivityContext";

test("renders Activity Tracker header", () => {
  render(
    <ActivityProvider>
      <App />
    </ActivityProvider>
  );

  expect(
    screen.getByRole("heading", { name: /activity tracker/i })
  ).toBeInTheDocument();
});
