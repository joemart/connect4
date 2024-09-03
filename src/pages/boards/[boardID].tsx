import { useRouter } from "next/router"
import { useEffect } from "react"

import { onValue, ref } from "firebase/database"
import { db } from "@firebase/firebase"

import Chat from "./chat"
import Board from "@/pages/components/Game/Board"

import styles from "./index.module.scss"

import { BoardIDContext, BoardIDContextProvider } from "../components/Context/BoardIDContext/BoardIDContext"

export default function BoardID() {

    const router = useRouter()

    //check if the boardID exists
    useEffect(() => {

        if (router.isReady) {
            const boardRef = ref(db, "/boards/" + router.query.boardID)
            return onValue(boardRef, async snapshot => {
                if (!snapshot.exists()) router.push("/")
                else {
                    //do something with the existing board info
                    //update DB here?
                    // console.log(snapshot.val())
                }
            })
        }
    }, [router.isReady])

    return <section className={styles["section"]}>
        <BoardIDContextProvider id={router.isReady ? router.query.boardID : ""}>
            <Chat />
            <Board />
        </BoardIDContextProvider>

    </section>
}