import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import styles from "./index.module.scss"
import { GetDB } from "@/utils/DBClass"

const Lobby = <T extends { LobbyNumber: number, BoardID: string, player1: string, player2: string, spectators: number }>({ LobbyNumber, BoardID, player1, player2, spectators }: T) => {

    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const router = useRouter()

    useEffect(() => {
        GetDB.getBoardUserRef(BoardID, player1).then(v => {
            setName1(v.val())
        })
    }, [name1])

    useEffect(() => {
        GetDB.getBoardUserRef(BoardID, player2).then(v => {
            setName2(v.val())
        })
    }, [name2])

    const onClickLobby = () => {
        router.push(`/boards/${BoardID}`)
    }

    return <section className={styles["section"]} onClick={onClickLobby}>
        <span className={styles["boardID"]}>Lobby #{LobbyNumber}</span>
        <div className={styles["users"]}>
            <span>Player1: {name1}</span>
            <span>Player2: {name2}</span>
            <span>Spectators: {spectators}</span>
        </div>
    </section>
}

export default Lobby