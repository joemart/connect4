import { channel } from "diagnostics_channel"

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
    // console.log(tempBoard)
    // console.log(indexes)
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

const board3 = ([
    ['1', '2', '', '', '', ''],
    ['', '1', '', '', '', ''],
    ['', '', '1', '', '', ''],
    ['', '', '', '1', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
])

const checkWin = (board:string[][], row:number, column:number) =>{
    //start from row, column
    //It will compare empty strings, beware of false positives!

    const checkWinAux = (rowLimit:number, columnLimit:number)=>{

        if(row+rowLimit>=0 && column+columnLimit>=0 && row+rowLimit <= board.length && column+columnLimit <= board[0].length){
            
            for(let i = 1; i <= 3; i++){

                if(board[row][column] !== board[rowLimit<0 ? row-i : rowLimit>0 ? row+i : row][columnLimit < 0 ? column - i : columnLimit > 0 ? column + i : column ]){
                    break
                }
                
                // console.log(board[rowLimit<0 ? row-i : rowLimit>0 ? row+i : row])
                // console.log(rowLimit<0 ? row-i : rowLimit>0 ? row+i : row)

                //if 'i' reaches 3 and it doesn't break, then 4 pieces are the same
                
                if(i==3) return true
            }
 
            
        }
        return false
    }

    //checkWinAux(board, -3, 3) top left
    //checkWinAux(board, -3, 0)

    //check top left


        //left side
        return checkWinAux(-3, 3)
        ||checkWinAux(-3, 0)
        ||checkWinAux(-3, -3)
        //middle side
        ||checkWinAux(0, 3)
        ||checkWinAux(0, -3)
        //right side
        ||checkWinAux(3, 3)
        ||checkWinAux(3, 0)
        ||checkWinAux(3, -3)

}

test("It should not win", ()=>{
    expect(checkWin(board3,0,1)).toBe(false)
})

// test("It should not win either", ()=>{
//     checkWin(board3,0,3)
//     expect(checkWin(board3,0,1)).toBe(false)
// })

const checkWinAux = (row:number, column:number, rowLimit:number, columnLimit:number)=>{
    
    // if(!(row+rowLimit>=0)) return "rowLimitMinOutOfbounds"
    // if(!(column+columnLimit>=0)) return "columnLimitMinOutOfbounds"
    // if(!(row+rowLimit <= board.length))return "rowLimitMaxOutOfbounds"
    // if(!(column+columnLimit <= board[0].length)) return "columnLimitMaxOutOfbounds"
    if(row+rowLimit>=0 && column+columnLimit>=0 && row+rowLimit <= board.length && column+columnLimit <= board[0].length){
        
        for(let i = 1; i <= 3; i++){

            if(board3[row][column] !== board3[rowLimit<0 ? row-i : rowLimit>0 ? row+i : row][columnLimit < 0 ? column - i : columnLimit > 0 ? column + i : column ]){
                break
            }

            // console.log(board3[rowLimit<0 ? row-i : rowLimit>0 ? row+i : row][columnLimit < 0 ? column - i : columnLimit > 0 ? column + i : column ])
            
            //if 'i' reaches 3 and it doesn't break, then 4 pieces are the same
            
            if(i==3) return true
        }



    } 
    return false

}

test("Testing the boundaries", ()=>{
    expect(checkWinAux(20,4,3,0)).toBe(false)
    expect(checkWinAux(2,40,3,0)).toBe(false)
    expect(checkWinAux(0,4,-3,0)).toBe(false)
    expect(checkWinAux(4,0,3,-3)).toBe(false)
})

test("Testing checkwinAux", ()=>{
    // expect(checkWinAux(0,0,0,3))
    expect(checkWinAux(1,1,0,3)).toBe(false)
})

test("Testing Checkwin", ()=>{
    expect(checkWin(board3,0,0)).toBe(true)
    expect(checkWin(board3,2,2)).toBe(false)
    expect(checkWin(board3,0,1)).toBe(false)
})