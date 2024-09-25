import styles from "./chat.module.scss"
import Person from "@/../public/person.svg"
import Send from "@/../public/send.svg"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "@/pages/components/Context/AuthContext/AuthContext"

import { BoardIDContext } from "../components/Context/BoardIDContext/BoardIDContext"
import { OnValueDB, PushDB } from "@/utils/DBClass"

const Chat = () => {

    const Auth = useContext(AuthContext)

    const Board = useContext(BoardIDContext)
    let BoardID: string[] | string | undefined
    if (Board)
        BoardID = Board.id


    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<{ id: { user: string, message: string } }>()
    const [onlineUsers, setOnlineUsers] = useState<number>(0)

    useEffect(() => {

        return OnValueDB.chatBoardIDOnValue(BoardID, snapshot => {
            setChat(snapshot.val())
        })
    }, [BoardID])


    useEffect(() => {
        return OnValueDB.boardOnValue(BoardID, (snapshot) => {
            if (!snapshot.exists()) return
            // console.log((snapshot.val().player1 ? 1 : 0) + (snapshot.val().player2 ? 1 : 0) + (snapshot.val().spectators?.length ?? 0))
            setOnlineUsers((snapshot.val().player1 ? 1 : 0) + (snapshot.val().player2 ? 1 : 0) + (snapshot.val().spectators?.length ?? 0))
        })
    }, [onlineUsers, BoardID])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (Auth && message !== "")
            PushDB.pushBoardIDChat(BoardID, { user: Auth?.user?.displayName, message })
        setMessage("")
    }

    return <section className={styles["section"]}>
        <div className={styles["person_wrapper"]}>
            <div className={styles["person"]}>
                <Person></Person>
                <div className={styles["online_people"]}>{onlineUsers}</div>
            </div>
        </div>
        <div className={styles["chat_wrapper"]}>
            <div className={styles["chat"]}>
                {chat ? Object.values(chat).map(c => <div>{c.user} : {c.message}</div>) : <></>}
            </div>
        </div>
        <div className={styles["type_wrapper"]}>
            <form className={styles["form"]} onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} placeholder="Type something..." value={message} />
                <button type="submit" ><Send></Send></button>
            </form>

        </div>
        {/* <div className={styles["surrender"]}>Surrender</div> */}

    </section>
}

export default Chat