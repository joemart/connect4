"use client";
import { createContext } from "react";
import { BoardType } from "./Board.types";

import { db } from "@firebase/firebase";
import {set, ref} from "firebase/database"

export const BoardContext = createContext<BoardType | undefined>(undefined)

// export const UpdateBoard: <F extends number, G extends string, H extends string[][] | undefined>(line: F, player: G, board: H) => void = (line, player, board) => {

//     let tempBoard = board

//     if(!tempBoard || !board) return

//     let row = tempBoard.findIndex((row, index) => {
//         return (row[line] !== "" || index === board.length - 1)
//     })

//     if (row !== 0) {
//         if (tempBoard[row][line] !== "") row -= 1
//         tempBoard[row][line] = player
//         set(ref(db, "board"), tempBoard)
//     }

// }