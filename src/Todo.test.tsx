import { render, screen, fireEvent } from "@testing-library/react";
import { TODO_CONTEXT } from "./todo-context";

import { TODO } from "@/types";
import { TodoComponent } from "./Todo";
import { vi } from "vitest";

describe("TodoComponent", () => {
  const testTodos: TODO[] = [
    {
      text: "Test todo",
      visible: true,
      completed: false,
    },
  ];

  const mockAddTodo = vi.fn();
  const mockToggleCompleteTodo = vi.fn();

  const mockContextValue = {
    Todos: testTodos,
    addTodo: mockAddTodo,
    toggleCompleteTodo: mockToggleCompleteTodo,
  };

  beforeEach(() => {
    render(
      <TODO_CONTEXT.Provider value={mockContextValue}>
        <TodoComponent />
      </TODO_CONTEXT.Provider>
    );
  });

  it("renders todos", async () => {
    const todoElement = await screen.findByText(/Test todo/i);
    expect(todoElement).toBeVisible();
  });

  it('calls addTodo when "Add" button is clicked', async () => {
    const input = await screen.findByPlaceholderText(/Enter new task.../i);
    fireEvent.change(input, { target: { value: "New task" } });

    const button = await screen.findByText(/Add/i);
    await fireEvent.click(button);

    expect(mockAddTodo).toHaveBeenCalledWith({
      text: "New task",
      visible: true,
      completed: false,
    });
  });

  it("calls toggleCompleteTodo when the todo item checkbox is clicked", async () => {
    const checkbox = await screen.findByRole("checkbox");
    await fireEvent.click(checkbox);

    expect(mockToggleCompleteTodo).toHaveBeenCalledWith("Test todo");
  });

  it("displays 'Items Not available' when there are no todos", async () => {
    const mockEmptyContextValue = {
      ...mockContextValue,
      Todos: [],
    };

    render(
      <TODO_CONTEXT.Provider value={mockEmptyContextValue}>
        <TodoComponent />
      </TODO_CONTEXT.Provider>
    );

    const noItemsMessage = await screen.findByText(/Items Not available/i);
    expect(noItemsMessage).toBeVisible();
  });
});
