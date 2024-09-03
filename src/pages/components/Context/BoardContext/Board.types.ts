export interface BoardType{
    UpdateBoard:(line:number, player:string, board: string[][] | undefined) => void,
    board: string[][]
}