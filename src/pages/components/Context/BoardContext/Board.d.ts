interface BoardType{
    UpdateBoard:(line:number, player:string, board: string[][] | undefined) => void,
    board: string[][]
}

export default BoardType