import { Dispatch, SetStateAction } from "react"

interface BoardType{
    UpdateBoard:(line:number, player:string, board: string[][] | undefined) => void,
    setColumn: Dispatch<SetStateAction<number>> ,
    board: string[][],
    column: number
}

export default BoardType