export type TODO_STATUS = "all" | "active" | "completed";

export type TODO = {
  text: string;
  visible: boolean;
  completed: boolean;
};

export type CONTEXT_TYPE = {
  Todos: TODO[];
  addTodo: (todo: TODO) => void;
  toggleCompleteTodo: (todoText: string) => void;
};
