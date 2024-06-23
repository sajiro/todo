import { ActivitySquare, AlignJustify, CheckIcon } from "lucide-react";
import { TODO_STATUS } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { StatusToggleButton } from "./status-toggle-button";

type StatusToggleProps = {
  onToggle: Dispatch<SetStateAction<TODO_STATUS>>;
  status: TODO_STATUS;
};

function StatusToggle({ status, onToggle }: StatusToggleProps): JSX.Element {
  const buttons = [
    {
      label: "All",
      icon: <AlignJustify className="h-4 w-4" />,
      value: "all",
      className: "rounded-l-md rounded-r-none",
    },
    {
      label: "Active",
      icon: <ActivitySquare className="h-4 w-4" />,
      value: "active",
      className: "rounded-none border-l-0 border-r-0",
    },
    {
      label: "Completed",
      icon: <CheckIcon className="h-4 w-4" />,
      value: "completed",
      className: "rounded-r-md rounded-l-none",
    },
  ];

  return (
    <div className="flex">
      {buttons.map(({ label, icon, value, className }) => (
        <StatusToggleButton
          key={value}
          label={label}
          icon={icon}
          isActive={status === value}
          onClick={() => onToggle(value as "all" | "active" | "completed")}
          className={className}
        />
      ))}
    </div>
  );
}

export default StatusToggle;
