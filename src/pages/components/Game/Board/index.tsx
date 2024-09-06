import { useState, useEffect } from "react"
import styles from "./index.module.scss"

//components
import Row from "@/pages/components/Game/Board/Row"
import { BoardIDContext } from "../../Context/BoardIDContext/BoardIDContext"
import { BoardContext } from "../../Context/BoardContext/BoardContext"
import Controls from "./Controls"

//Database
import { db } from "@firebase/firebase"
import { ref, onValue, set } from "firebase/database"

import { OnValueDB, SetDB } from "@/utils/DBClass"

import { useContext } from "react"

export default function Board() {

    // const BoardID = useContext(BoardIDContext)?.id
    const Board = useContext(BoardIDContext)
    let BoardID: string[] | string | undefined
    if (Board)
        BoardID = Board.id

    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ])

    // const [currPlayer, setCurrPlayer] = useState("X")
    // const [oppPlayer, setOppPlayer] = useState("O")
    // const [gameOver, setGameOver] = useState(false)


    useEffect(() => {

        return OnValueDB.boardIDMovesOnValue(BoardID, snapshot => setBoard(snapshot.val()))

    }, [BoardID])

    //player will be R or Y
    const UpdateBoard: <F extends number, G extends string, H extends string[][] | undefined>(line: F, player: G, board: H) => void = (line, player, board) => {

        let tempBoard = board
        if (!tempBoard || !board) return
        let row = tempBoard.findIndex((row, index) => {
            return (row[line] !== "" || index === board.length - 1)
        })

        if (row !== 0) {
            if (tempBoard[row][line] !== "") row -= 1
            tempBoard[row][line] = player
            // set(ref(db, "board"), tempBoard)
            if (BoardID && !Array.isArray(BoardID))
                SetDB.setMove(BoardID, tempBoard)
        }

    }



    return <section className={styles["wrapper"]}>
        <div className={styles["board"]}>
            <BoardContext.Provider value={{ UpdateBoard, board }}>
                {board.map((row, i) => {
                    return <Row key={i} row={row} />
                })}
            </BoardContext.Provider>
            <Controls></Controls>
        </div></section>

}