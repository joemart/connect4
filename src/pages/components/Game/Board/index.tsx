import { useState, useEffect, useContext } from "react"
import styles from "./index.module.scss"

//components
import Row from "@/pages/components/Game/Board/Row"
import { BoardIDContext } from "@/pages/components/Context/BoardIDContext/BoardIDContext"
import { BoardContext } from "@/pages/components/Context/BoardContext/BoardContext"
import Controls from "./Controls"
import Winner from "@/pages/components/Winner"

//Database
import { OnValueDB, SetDB } from "@/utils/DBClass"
import { AuthContext } from "../../Context/AuthContext/AuthContext"

export default function Board() {

    const Board = useContext(BoardIDContext)
    const Auth = useContext(AuthContext)
    let BoardID: string[] | string | undefined
    if (Board)
        BoardID = Board.id

    const [board, setBoard] = useState<string[][]>([
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ])

    const [winner, setWinner] = useState("")

    const [indexes, setIndexes] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])

    const checkWin = (board: string[][], row: number, column: number) => {
        //It will compare empty strings, beware of false positives!

        const checkWinAux = (rowLimit: number, columnLimit: number) => {

            if (row + rowLimit >= 0 && column + columnLimit >= 0 && row + rowLimit <= board.length && column + columnLimit <= board[0].length) {

                for (let i = 1; i <= 3; i++) {

                    if (board[row][column] !== board[rowLimit < 0 ? row - i : rowLimit > 0 ? row + i : row][columnLimit < 0 ? column - i : columnLimit > 0 ? column + i : column]) {
                        break
                    }

                    //if 'i' reaches 3 and it doesn't break, then 4 pieces are the same
                    if (i == 3) {
                        //Games played +1, games won +1
                        return true
                    }
                }


            }
            return false
        }

        //left side
        return checkWinAux(-3, 3)
            || checkWinAux(-3, 0)
            || checkWinAux(-3, -3)
            //middle side
            || checkWinAux(0, 3)
            || checkWinAux(0, -3)
            //right side
            || checkWinAux(3, 3)
            || checkWinAux(3, 0)
            || checkWinAux(3, -3)

    }

    useEffect(() => {

        return OnValueDB.boardIDMovesOnValue(BoardID, snapshot => {
            if (!snapshot.exists()) return
            setBoard(snapshot.val())

            let tempIndexes = [...indexes]
            snapshot.val().forEach((row: string[], rowNum: number) => {
                tempIndexes[rowNum] = row.findIndex((v: string, columnNum: number) => {
                    if (row[columnNum] == "") {
                        return true
                    }
                })
            })
            setIndexes(tempIndexes)


        })

    }, [BoardID])

    useEffect(() => {
        return OnValueDB.boardIDWin(BoardID, snapshot => {
            setWinner(snapshot.val())
        })
    }, [BoardID])

    //Creating a better UpdateBoard
    const UpdateBoard: <F extends number, G extends string, H extends string[][] | undefined>(column: F, player: G, board: H) => void = (column, player, board) => {

        let tempBoard = board
        //return if tempBoard array has issues
        if (!tempBoard || tempBoard[column][indexes[column]] == undefined) return
        //if the cell is "", then write on it

        if (tempBoard[column][indexes[column]] == "") {
            tempBoard[column][indexes[column]] = player
        }


        if (BoardID && !Array.isArray(BoardID)) {
            //set move in DB
            SetDB.setMove(BoardID, tempBoard)
            //check for win and update DB
            checkWin(tempBoard, column, indexes[column]) ? SetDB.setWinner(BoardID, Auth ? Auth.user ? Auth.user.uid : "" : "") : null
        }

    }

    //display who won on their screen

    return <section className={`${styles["wrapper"]} ${styles[winner ? "win" : ""]}`}>
        {winner ? <Winner BoardID={BoardID} /> : <></>}

        <div className={`${styles["board"]}`}>
            <BoardContext.Provider value={{ UpdateBoard, board }}>
                {board.map((row, i) => {
                    return <Row key={i} row={row} column={i} />
                })}
            </BoardContext.Provider>
        </div>
        <Controls></Controls>
    </section>

}