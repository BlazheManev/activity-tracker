import React from "react";
import { render, screen } from "@testing-library/react";
import ActivityRing from "./ActivityRing";

describe("ActivityRing", () => {
  it("renders correct number of segments", () => {
    const items = [
      { id: "1", label: "Reading", minutes: 60 },
      { id: "2", label: "Running", minutes: 120 },
    ];

    render(<ActivityRing items={items} goalMinutes={420} />);
    const segments = document.querySelectorAll("circle");
    expect(segments.length).toBeGreaterThanOrEqual(3);
  });
});
