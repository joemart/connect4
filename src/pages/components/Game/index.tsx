import styles from "./index.module.scss"
import Board from "./Board"
import Chat from "./Chat"
import Reset from "@/utils/Reset"

import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext/AuthContext"

import { getUserRef } from "@/utils/DBClass"

import { User } from "./User.type"

const Game = () => {

    const Auth = useContext(AuthContext)
    const [user, setUser] = useState<User | null>(null)
    const [flag, setFlag] = useState(true)

    useEffect(() => {

        const getAuth = async () => {
            if (Auth && Auth.user)
                getUserRef(Auth.user.uid).then(snapshot => {

                    setUser(snapshot.val())
                    setFlag(false)
                })

        }
        getAuth()

    }, [flag])

    return <section className={styles["section"]}>


        {user ? user.displayName : "No id"}

        {/* Make a turn based game */}
        <button onClick={Reset}>Reset DB</button>
        <Chat></Chat>
        <Board></Board>

    </section>
}

export default Game

Game.getLayout = (page: React.ReactElement) => {
    return <>{page}</>
}