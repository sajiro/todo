import { ChangeEvent, useContext, useState } from "react";
import { TODO_CONTEXT } from "./todo-context";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { TODO, TODO_STATUS } from "./types";
import TodoItem from "./components/todo-item";
import StatusToggle from "@/components/status-toggle";

export const TodoComponent = () => {
  const value = useContext(TODO_CONTEXT);

  const [todo, setTodo] = useState<TODO>({
    text: "",
    visible: true,
    completed: false,
  });

  const [status, setStatus] = useState<TODO_STATUS>("all");

  const addTodoHandler = () => {
    if (value) {
      value.addTodo(todo);

      setTodo({
        text: "",
        visible: true,
        completed: false,
      });
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setTodo({
      ...todo,
      text: event.currentTarget.value,
      visible: true,
      completed: false,
    });
  };

  const filteredTodos = value?.Todos.filter((todo) => {
    if (status === "all") return true;
    if (status === "active") return !todo.completed;
    if (status === "completed") return todo.completed;
  });

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-left font-bold mb-4 text-slate-700 text-xl">
        React Todo
      </h1>
      <div className="flex gap-2">
        <Input
          value={todo.text}
          onChange={onChangeHandler}
          placeholder="Enter new task..."
        />
        <Button onClick={addTodoHandler} disabled={!todo.text}>
          + Add
        </Button>
      </div>
      <div className="mt-3 mb-5">
        <StatusToggle status={status} onToggle={setStatus} />
      </div>
      <div>
        {filteredTodos?.map((todo, idx) => (
          <TodoItem
            todo={todo}
            key={idx}
            onCheckedChange={() => value?.toggleCompleteTodo(todo.text)}
          />
        ))}
        {filteredTodos?.length === 0 && <div>Items Not available</div>}
      </div>
    </div>
  );
};
