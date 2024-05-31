import { useState, useEffect } from "react"
import Row from "../Row"
import { BoardContext } from "../Context/BoardContext"
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

    const UpdateBoard: <T extends number>(line: T) => void = (line) => {

        let tempBoard = board

        let row = tempBoard.findIndex((row, index) => {
            return (row[line] !== "" || index === board.length - 1)
        })

        if (row !== board.length - 1) row -= 1
        if (tempBoard[row][line] !== "") row -= 1

        tempBoard[row][line] = "X"

        set(ref(db, "board"), tempBoard)

    }



    return <section>
        <BoardContext.Provider value={UpdateBoard}>
            {board.map((row, i) => {
                return <Row key={i} row={row} />
            })}
        </BoardContext.Provider>

    </section>
}