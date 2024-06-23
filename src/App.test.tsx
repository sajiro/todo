import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import { TODO } from "./types";

describe("App Component", () => {
  const testTodos: TODO[] = [
    {
      text: "Test todo",
      visible: true,
      completed: false,
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(testTodos));
  });

  it("loads todos from localStorage", () => {
    render(<App />);
    const todoElement = screen.getByText(/Test todo/i);
    expect(todoElement).toBeVisible();
  });

  it("saves todos to localStorage when updated", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter new task.../i);
    fireEvent.change(input, { target: { value: "New task" } });
    const button = screen.getByText(/Add/i);
    fireEvent.click(button);

    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(storedTodos).toHaveLength(2);
    expect(storedTodos[1]).toEqual({
      text: "New task",
      visible: true,
      completed: false,
    });
  });

  it("adds a new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter new task.../i);
    fireEvent.change(input, { target: { value: "New task" } });
    const button = screen.getByText(/Add/i);
    fireEvent.click(button);

    const todoElement = screen.getByText(/New task/i);
    expect(todoElement).toBeVisible();
  });

  it("toggles the completion status of a todo", () => {
    render(<App />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(storedTodos[0].completed).toBe(true);

    fireEvent.click(checkbox);
    const updatedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(updatedTodos[0].completed).toBe(false);
  });
});
