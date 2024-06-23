import { FC } from "react";
import { Button } from "./ui/button";

export const StatusToggleButton: FC<{
  label: string;
  icon: JSX.Element;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, icon, isActive, onClick, className }) => (
  <Button
    onClick={onClick}
    className={`flex flex-1 items-center justify-center px-4 py-2 border border-slate-700 text-sm font-medium hover:text-white hover:bg-slate-700 ${
      isActive ? "bg-slate-700 text-white" : "bg-white text-gray-700"
    } ${className}`}
  >
    <div className="flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </div>
  </Button>
);
