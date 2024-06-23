import { useEffect, useState } from "react";
import "./App.css";
import { TodoComponent } from "./Todo";
import { TODO_CONTEXT } from "./todo-context";
import { TODO } from "./types";

function App() {
  const [todos, setTodos] = useState<TODO[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleCompleteTodo = (todoText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.text === todoText ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (todo: TODO) => {
    setTodos([...todos, todo]);
  };

  return (
    <TODO_CONTEXT.Provider
      value={{
        Todos: todos,
        addTodo,
        toggleCompleteTodo,
      }}
    >
      <TodoComponent />
    </TODO_CONTEXT.Provider>
  );
}

export default App;
