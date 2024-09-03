import styles from "./options.module.scss"
import { db } from "@firebase/firebase"
import { push, ref } from "firebase/database"
import { useRouter } from "next/router"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext/AuthContext"
import { createBoardID } from "@/utils/DBClass"

const Options = () => {
    const router = useRouter()
    const Auth = useContext(AuthContext)
    const createLobby = () => {

        const uid = Auth?.user?.uid
        const boardID = createBoardID(uid)
        router.push("/boards/" + boardID)

    }

    return <div className={styles["section_wrapper"]}><section className={styles["section"]}>
        <button onClick={createLobby}>Create lobby</button>
        <button>Find opponent</button>
        <button>Find specific opponent</button>
    </section>
    </div>
}

export default Options