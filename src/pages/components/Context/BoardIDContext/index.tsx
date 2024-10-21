import { createContext } from "react";
import BoardID from "./BoardID";

export const BoardIDContext = createContext<BoardID | undefined>(undefined)

const BoardIDContextProvider = <T extends React.ReactNode, G extends string | string[] | undefined>({ children, id }: { children: T, id: G }): React.ReactNode => {

    return <BoardIDContext.Provider value={{ id }}>{children}</BoardIDContext.Provider>

}

export default BoardIDContextProvider