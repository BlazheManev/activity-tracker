import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ActivityProvider } from "../../context/ActivityContext";
import { activityService } from "../../services/activityService";
import ActivityForm from "./ActivityForm";

jest.mock("../../services/activityService", () => ({
  activityService: {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    clear: jest.fn(),
  },
}));

describe("ActivityForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (activityService.list as jest.Mock).mockResolvedValue([]);
    (activityService.create as jest.Mock).mockResolvedValue(undefined);
  });

  const setup = async () => {
    await act(async () => {
      render(
        <ActivityProvider>
          <ActivityForm />
        </ActivityProvider>
      );
    });
  };

  it("disables Add button if required fields are empty", async () => {
    await setup();
    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled();
  });

  it("enables Add button when form is valid and calls service", async () => {
    await setup();

    fireEvent.change(screen.getByLabelText(/name \*/i), {
      target: { value: "Reading" },
    });
    fireEvent.change(screen.getByLabelText(/date \*/i), {
      target: { value: "2025-08-10" },
    });
    fireEvent.change(screen.getByLabelText(/duration \(min\) \*/i), {
      target: { value: "30" },
    });

    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).not.toBeDisabled();

    await act(async () => {
      fireEvent.click(addButton);
    });

    expect(activityService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Reading",
        date: "2025-08-10",
        durationMinutes: 30,
      })
    );
  });
});
