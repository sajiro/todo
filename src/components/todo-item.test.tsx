import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TODO } from "@/types";
import TodoItem from "./todo-item";

describe("TodoItem Component", () => {
  it("renders correctly with given todo item", () => {
    const todo: TODO = {
      text: "Test Todo",
      completed: false,
      visible: false,
    };
    const onCheckedChange = vi.fn();

    render(<TodoItem todo={todo} onCheckedChange={onCheckedChange} />);

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onCheckedChange when checkbox is clicked", () => {
    const todo: TODO = {
      text: "Test Todo",
      completed: false,
      visible: false,
    };
    const onCheckedChange = vi.fn();

    render(<TodoItem todo={todo} onCheckedChange={onCheckedChange} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("applies correct class when todo is completed", () => {
    const todo: TODO = {
      text: "Test Todo",
      completed: true,
      visible: false,
    };
    const onCheckedChange = vi.fn();

    const { container } = render(
      <TodoItem todo={todo} onCheckedChange={onCheckedChange} />
    );

    expect(container.firstChild).toHaveClass("bg-green-100");
  });

  it("applies correct class when todo is not completed", () => {
    const todo: TODO = {
      text: "Test Todo",
      completed: false,
      visible: false,
    };
    const onCheckedChange = vi.fn();

    const { container } = render(
      <TodoItem todo={todo} onCheckedChange={onCheckedChange} />
    );

    expect(container.firstChild).toHaveClass("bg-slate-100");
  });
});
