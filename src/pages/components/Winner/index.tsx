import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "./index.module.scss"
import { GetDB, UtilDB } from "@/utils/DBClass"


const Winner = <T extends { BoardID: string | string[] | undefined }>({ BoardID }: T) => {

    const [winner, setWinner] = useState("")
    const router = useRouter()
    useEffect(() => {
        GetDB.getWinnerName(BoardID).then(x => setWinner(x))
    }, [winner])

    const handleRematch = () => {
        if (!BoardID || Array.isArray(BoardID)) return
        UtilDB.resetBoardID(BoardID)
    }

    const handleBackToLobby = () => {
        router.push("/")
    }

    return <section className={`${styles["section"]}`}>
        <span className={styles["winner-text"]}>{`The winner is... ${winner}!`}</span>
        <div className={styles["buttons"]}>
            <button className={styles["rematch"]} onClick={handleRematch}>Rematch</button>
            <button className={styles["back-to-lobby"]} onClick={handleBackToLobby}>Back to lobby</button>
        </div>
    </section>
}

export default Winner