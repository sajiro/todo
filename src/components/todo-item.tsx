import { TODO } from "@/types";
import { Checkbox } from "./ui/checkbox";

type TodoItemProps = {
  todo: TODO;
  onCheckedChange: (value: boolean) => void;
};

function TodoItem({ todo, onCheckedChange }: TodoItemProps): JSX.Element {
  return (
    <div
      className={`flex items-center justify-between p-4 mb-2 rounded-md ${
        todo.completed ? "bg-green-100" : "bg-slate-100 "
      }`}
    >
      <div className="flex items-start">
        <Checkbox
          checked={!!todo.completed}
          onCheckedChange={onCheckedChange}
          className="mr-2 mt-1"
        />

        <div className="flex flex-col text-left items-start justify-around">
          <span>{todo.text}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
