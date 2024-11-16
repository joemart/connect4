import styles from "./chat.module.scss"
import Person from "@/../public/person.svg"
import Send from "@/../public/send.svg"
import { useContext, useEffect, useState, useRef } from "react"
import { OnValueDB, PushDB } from "@/utils/DBClass"
import { AuthContext } from "../Context/AuthContext"


const Chat = () => {

    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<{ id: { user: string, message: string } }>()

    const Auth = useContext(AuthContext)
    const [onlineUsers, setOnlineUsers] = useState<number>(0)
    const chatRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (chatRef.current)
            chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }, [chat])

    useEffect(() => {
        return OnValueDB.chatOnValue(snapshot => setChat(snapshot.val()))
    }, [])

    useEffect(() => {
        return OnValueDB.usersOnValue(snapshot => setOnlineUsers(snapshot.size))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (Auth && message !== "")
            PushDB.pushMenuChat({ user: Auth?.user?.displayName, message })
        // push(chatRef, { user: Auth?.user?.displayName, message })
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
        {/* <div className={styles["surrender"]}>Surrender</div> */}

    </section>
}

export default Chat