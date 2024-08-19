import { createContext } from "react";
import { BoardID } from "./BoardID.types";

export const BoardIDContext = createContext<BoardID | undefined>(undefined)

export const BoardIDContextProvider = <T extends React.ReactNode, G extends string | string[] | undefined>({ children, id }: { children: T, id: G }): React.ReactNode => {

    return <BoardIDContext.Provider value={{ id }}>{children}</BoardIDContext.Provider>

}