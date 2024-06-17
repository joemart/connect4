import { useState, useEffect } from "react"
import styles from "./index.module.scss"

//components
import Row from "@/pages/components/Main/Board/Row"
import { BoardContext } from "@/pages/components/Context/BoardContext"
import Controls from "./Controls"

//Database
import { db } from "config/firebase"
import { ref, onValue, set } from "firebase/database"


export default function Board() {

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

        onValue(ref(db, "board"), snapshot => setBoard(snapshot.val()))

    }, [])

    //player will be R or Y
    const UpdateBoard: <T extends number, P extends string>(line: T, player: P) => void = (line, player) => {

        let tempBoard = board

        let row = tempBoard.findIndex((row, index) => {
            return (row[line] !== "" || index === board.length - 1)
        })

        if (row !== 0) {
            if (tempBoard[row][line] !== "") row -= 1
            tempBoard[row][line] = player
            set(ref(db, "board"), tempBoard)
        }

    }



    return <section className={styles["section"]}>
        <BoardContext.Provider value={UpdateBoard}>
            {board.map((row, i) => {
                return <Row key={i} row={row} />
            })}
        </BoardContext.Provider>
        <Controls></Controls>
    </section>
}