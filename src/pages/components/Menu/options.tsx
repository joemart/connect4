import styles from "./options.module.scss"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { UtilDB, GetDB, PushDB } from "@/utils/DBClass"
import Opponent from "./opponent/index"


const boardPath = "/boards"

const Options = () => {
    const router = useRouter()
    const Auth = useContext(AuthContext)
    const [flag, setFlag] = useState(false)
    const createLobby = () => {

        const boardID = UtilDB.createBoardID()
        router.push("/boards/" + boardID)
    }

    const joinALobby = () => {
        // Inject player into lobby in 'player2'
        GetDB.getOpenLobby().then(snapshot => {
            //If the key or user cannot be found, return
            if (!(snapshot.key && Auth && Auth.user)) return
            //Push the player into the lobby
            PushDB.pushPlayerIntoGame(snapshot.key, Auth.user.uid)
            //Move player to the lobby
            router.push(boardPath + "/" + snapshot.key)
        })
    }

    return <div className={styles["section_wrapper"]}><section className={styles["section"]}>
        {flag ? <Opponent setFlag={setFlag} /> : null}
        <button onClick={createLobby}>Create lobby</button>
        <button onClick={joinALobby}>Join a lobby</button>
        <button onClick={() => setFlag(true)}>Find specific lobby</button>
    </section>
    </div>
}

export default Options