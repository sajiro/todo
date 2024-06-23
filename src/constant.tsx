import { AlignJustify, ActivitySquare, CheckIcon } from "lucide-react";

export const STATUS_BUTTON = [
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
