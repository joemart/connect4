import styles from "./index.module.scss"
import { OnValueDB } from "@/utils/DBClass"
import { useEffect, useState } from "react"
import Lobby from "./Lobby"

export type UserKey = { [key: string]: string }
type UserID = UserKey[keyof UserKey]
type Lobbies = {
    [key: string]: {
        board: string[][],
        player1: UserID,
        player2: UserID,
        turn: string,
        users: UserKey,
        winner: UserID,
        spectators: UserKey[]
    }
}

const BrowseLobbies = () => {

    const [lobbies, setLobbies] = useState<Lobbies>()

    useEffect(() => {
        return OnValueDB.allBoardsValue(snapshot => {
            setLobbies(snapshot.val())
        })
    }, [])

    const displayLobbies = () => {
        if (!lobbies) return
        const lobbyKeys = Object.keys(lobbies)

        return lobbyKeys.map((v, i) => <Lobby LobbyNumber={i + 1} BoardID={v} player1={lobbies[v].player1} player2={lobbies[v].player2} spectators={lobbies[v].spectators} />)

    }

    return <section className={styles["section"]}>{displayLobbies()}</section>
}

export default BrowseLobbies