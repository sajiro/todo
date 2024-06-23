import { createContext } from "react";
import { CONTEXT_TYPE } from "./types";

export const TODO_CONTEXT = createContext<CONTEXT_TYPE | null>(null);
