import { createContext } from "react";
import BoardType from "./Board";


const BoardContext = createContext<BoardType | undefined>(undefined)

export default BoardContext