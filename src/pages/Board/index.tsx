import { useState } from "react"
import Row from "../Row"
import Slot from "../Slot"

export default function Board<T extends React.ReactNode>({ children }: { children: T }) {

    const [board, setBoard] = useState([
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ])

    const [currPlayer, setCurrPlayer] = useState("X")
    const [oppPlayer, setOppPlayer] = useState("O")
    const [gameOver, setGameOver] = useState(false)

    return <section>
        {children}
    </section>
}