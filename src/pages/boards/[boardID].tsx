import { useRouter } from "next/router"
import { useEffect, useContext } from "react"

import { OnValueDB, PushDB, DisconnectDB } from "@/utils/DBClass"
import Chat from "./chat"
import Board from "@/pages/components/Game/Board"
import Layout from "@/pages/components/layout"

import styles from "./index.module.scss"

import { BoardIDContextProvider } from "../components/Context/BoardIDContext/BoardIDContext"
import { AuthContext } from "../components/Context/AuthContext/AuthContext"


//Log in user in DB when joining
//log out user from DB when leaving

export default function BoardID() {


    const router = useRouter()
    const Auth = useContext(AuthContext)




    //check if the boardID exists
    useEffect(() => {

        async function addUser() {
            if (router.query.boardID && !Array.isArray(router.query.boardID) && Auth?.user) {
                await PushDB.pushUserIntoLobby(router.query.boardID, Auth.user)
                await PushDB.pushPlayerIntoLobby(router.query.boardID, Auth.user.uid)
                DisconnectDB.BoardDC(router.query.boardID, Auth?.user?.uid)
            }
        }

        if (router.isReady) {

            return OnValueDB.boardOnValue(router.query.boardID, async snapshot => {
                if (!snapshot.exists()) router.push("/")
                else {
                    addUser()
                    //do something with the existing board info
                    //update DB here?
                    // console.log(snapshot.val())
                }
            })
        }
    }, [router.isReady, Auth?.user?.uid])




    return <section className={styles["section"]}>
        <BoardIDContextProvider id={router.isReady ? router.query.boardID : ""}>
            <Chat />
            <Board />
        </BoardIDContextProvider>

    </section>
}

BoardID.getLayout = (page: React.ReactElement) => {
    return <Layout>{page}</Layout>
}