import styles from "./chat.module.scss"
import Person from "@/../public/person.svg"
import Send from "@/../public/send.svg"
import { useContext, useEffect, useState } from "react"
import { onValue, push } from "firebase/database"
import { db } from "@firebase/firebase"
import { ref } from "firebase/database"
import { AuthContext } from "../Context/AuthContext/AuthContext"

const chatRef = ref(db, "/chat")
const usersRef = ref(db, "/users")

const Chat = () => {

    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<{ id: { user: string, message: string } }>()

    const Auth = useContext(AuthContext)
    const [onlineUsers, setOnlineUsers] = useState<number>(0)

    useEffect(() => {

        return onValue(chatRef, snapshot => setChat(snapshot.val()))
    }, [])

    useEffect(() => {
        return onValue(usersRef, snapshot => setOnlineUsers(snapshot.size))
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (Auth && message !== "")
            push(chatRef, { user: Auth?.user?.displayName, message })
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