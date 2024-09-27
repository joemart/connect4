import { useState, useEffect, useContext } from "react"
import styles from "./index.module.scss"

//components
import Row from "@/pages/components/Game/Board/Row"
import { BoardIDContext } from "../../Context/BoardIDContext/BoardIDContext"
import { BoardContext } from "../../Context/BoardContext/BoardContext"
import Controls from "./Controls"

//Database
import { OnValueDB, SetDB } from "@/utils/DBClass"

export default function Board() {

    const Board = useContext(BoardIDContext)
    let BoardID: string[] | string | undefined
    if (Board)
        BoardID = Board.id

    const [board, setBoard] = useState([
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ])

    const [indexes, setIndexes] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])


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



    //Creating a better UpdateBoard
    const UpdateBoard: <F extends number, G extends string, H extends string[][] | undefined>(column: F, player: G, board: H) => void = (column, player, board) => {

        let tempBoard = board
        //return if tempBoard array has issues
        if (!tempBoard || tempBoard[column][indexes[column]] == undefined) return
        //if the cell is "", then write on it

        if (tempBoard[column][indexes[column]] == "") {
            tempBoard[column][indexes[column]] = player
        }


        if (BoardID && !Array.isArray(BoardID))
            SetDB.setMove(BoardID, tempBoard)

        //check win here?
        //tempBoard, column and row
    }



    return <section className={styles["wrapper"]}>
        <div className={styles["board"]}>
            <BoardContext.Provider value={{ UpdateBoard, board }}>
                {board.map((row, i) => {
                    return <Row key={i} row={row} column={i} />
                })}
            </BoardContext.Provider>
        </div>
        <Controls></Controls>
    </section>

}