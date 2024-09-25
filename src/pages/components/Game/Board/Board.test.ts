
const board = ([
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
])


const indexes = [0,0,0,0,0,0,0]

const UpdateBoard: <F extends number, G extends string, H extends string[][] | undefined>(line: F, player: G, board: H) => void = (line, player, board) => {

    let tempBoard = board
    if (!tempBoard || !board) return
    let row = tempBoard.findIndex((row, index) => {
        return (row[line] !== "" || index === board.length - 1)
    })

    if (row !== 0) {
        if (tempBoard[row][line] !== "") row -= 1
        tempBoard[row][line] = player

    }

    return tempBoard
}



test("Jester works", ()=> expect(1).toBe(1))


test("Testing UpdateBoard", ()=>{
    
    expect(UpdateBoard(0,"1",board)).toEqual([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['1', '', '', '', '', '', '']
    ])

    
})

const board2 = ([
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
])

const UpdateBoard2: <F extends number, G extends string, H extends string[][] | undefined>(row: F, player: G, board: H) => void = (row, player, board) => {
    let tempBoard = board

    if(!tempBoard) return

    tempBoard[row][indexes[row]++] = player
    console.log(tempBoard)
    console.log(indexes)
    return tempBoard
}

test("Testing UpdateBoard2", function(){
    expect(UpdateBoard2(0,"1", board2)).toEqual([
        ['1', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ])

    expect(UpdateBoard2(0,"1", board2)).toEqual([
        ['1', '1', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ])
})
