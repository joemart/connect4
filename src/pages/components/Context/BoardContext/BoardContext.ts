"use client";
import { createContext } from "react";
import { BoardType } from "./Board.types";

export const BoardContext = createContext<BoardType | undefined>(undefined)