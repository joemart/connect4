import styles from "./chat.module.scss"
import Person from "@/../public/person.svg"
import Send from "@/../public/send.svg"
import { MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "@/pages/components/Context/AuthContext"

import { BoardIDContext } from "../components/Context/BoardIDContext"
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
    const [availableSeat, setAvailableSeat] = useState(false)
    const chatRef = useRef<HTMLDivElement>(null)

    //useEffect that scrolls to the bottom of the chat on new chat message
    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" })

    }, [chat])

    useEffect(() => {

        return OnValueDB.chatBoardIDOnValue(BoardID, snapshot => {
            setChat(snapshot.val())
        })
    }, [BoardID])


    useEffect(() => {
        return OnValueDB.boardOnValue(BoardID, (snapshot) => {
            if (!snapshot.exists()) return

            setOnlineUsers((snapshot.val().player1 ? 1 : 0) + (snapshot.val().player2 ? 1 : 0) + (snapshot.val().spectators?.length ?? 0))
        })
    }, [onlineUsers, BoardID])

    useEffect(() => {
        return OnValueDB.boardOnValue(BoardID, snapshot => {

            if (!snapshot.exists()) return
            if (!Auth || !Auth.user) return


            if ((snapshot.val().player1 !== Auth.user.uid
                && snapshot.val().player2 == undefined)
                || (snapshot.val().player2 !== Auth.user.uid
                    && snapshot.val().player1 == undefined))
                setAvailableSeat(true)
            else setAvailableSeat(false)
        })
    }, [availableSeat, BoardID])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (Auth && message !== "")
            PushDB.pushBoardIDChat(BoardID, { user: Auth?.user?.displayName, message })
        setMessage("")
    }

    const handleSeat = () => {
        if (!Auth || !Auth.user) return
        if (Array.isArray(BoardID) || !BoardID) return

        PushDB.pushPlayerIntoGame(BoardID, Auth.user.uid)
    }

    const Seat = () => {
        return <button onClick={handleSeat}>Sit</button>
    }

    return <section className={styles["section"]}>
        <div className={styles["person_wrapper"]}>
            <div className={styles["person"]}>
                <Person />
                <div className={styles["online_people"]}>{onlineUsers}</div>
            </div>
        </div>
        <div className={styles["chat_wrapper"]}>
            <div className={styles["chat"]} ref={chatRef}>
                {chat ? Object.values(chat).map(c => <div>{c.user} : {c.message}</div>) : <></>}
            </div>
        </div>
        <div className={styles["type_wrapper"]}>
            <form className={styles["form"]} onSubmit={onSubmit}>
                <input type="text" onChange={handleChange} placeholder="Type something..." value={message} />
                <button type="submit" ><Send></Send></button>
            </form>

        </div>

        {/* Sit up from table */}
        {availableSeat ? <Seat /> : <></>}
        {/* <div className={styles["surrender"]}>Surrender</div> */}

    </section>
}

export default Chat