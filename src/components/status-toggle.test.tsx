import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TODO_STATUS } from "@/types";
import StatusToggle from "@/components/status-toggle";

describe("StatusToggle Component", () => {
  it("renders all status buttons", () => {
    const onToggle = vi.fn();
    const status: TODO_STATUS = "all";

    render(<StatusToggle status={status} onToggle={onToggle} />);

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("highlights the active status button", () => {
    const onToggle = vi.fn();
    const status: TODO_STATUS = "active";

    render(<StatusToggle status={status} onToggle={onToggle} />);

    const activeButton = screen.getByText("Active").closest("button");
    expect(activeButton).toHaveClass("bg-slate-700 text-white");
  });

  it("calls onToggle with correct status when button is clicked", () => {
    const onToggle = vi.fn();
    const status: TODO_STATUS = "all";

    render(<StatusToggle status={status} onToggle={onToggle} />);

    fireEvent.click(screen.getByText("Active"));
    expect(onToggle).toHaveBeenCalledWith("active");

    fireEvent.click(screen.getByText("Completed"));
    expect(onToggle).toHaveBeenCalledWith("completed");
  });

  it("applies correct class to buttons", () => {
    const onToggle = vi.fn();
    const status: TODO_STATUS = "all";

    render(<StatusToggle status={status} onToggle={onToggle} />);

    const allButton = screen.getByText("All").closest("button");
    const activeButton = screen.getByText("Active").closest("button");
    const completedButton = screen.getByText("Completed").closest("button");

    expect(allButton).toHaveClass("rounded-l-md rounded-r-none");
    expect(activeButton).toHaveClass("rounded-none border-l-0 border-r-0");
    expect(completedButton).toHaveClass("rounded-r-md rounded-l-none");
  });
});
