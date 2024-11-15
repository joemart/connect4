import { useRouter } from "next/router"
import { useEffect, useContext } from "react"

import { PushDB, DisconnectDB, GetDB, RemoveDB } from "@/utils/DBClass"
import Chat from "./chat"
import Board from "@/pages/components/Game/Board"
import Layout from "@/pages/components/layout"

import styles from "./index.module.scss"

import BoardIDContextProvider from "../components/Context/BoardIDContext"
import { AuthContext } from "../components/Context/AuthContext"


//Log in user in DB when joining
//log out user from DB when leaving

export default function BoardID() {


    const router = useRouter()
    const Auth = useContext(AuthContext)

    //use getStaticProps? getServerSideProps?


    //check if the boardID exists
    useEffect(() => {

        async function addUser() {
            if (router.query.boardID && !Array.isArray(router.query.boardID) && Auth?.user) {
                await PushDB.pushUserIntoLobby(router.query.boardID, Auth.user)
                await PushDB.pushPlayerIntoGame(router.query.boardID, Auth.user.uid)
                await DisconnectDB.BoardDC(router.query.boardID, Auth.user.uid)
            }
        }

        async function addSpectator() {
            if (router.query.boardID && !Array.isArray(router.query.boardID) && Auth?.user) {
                await PushDB.pushUserIntoLobby(router.query.boardID, Auth.user)
                await PushDB.pushBoardSpectators(router.query.boardID, Auth.user.uid)
                await DisconnectDB.SpectatorDC(router.query.boardID, Auth.user.uid)
            }
        }

        async function addUserOrSpectator() {
            if (!router.query.boardID || Array.isArray(router.query.boardID) || !Auth || !Auth.user) return
            const snapshot = (await GetDB.getBoardRef(router.query.boardID)).val()

            if ((snapshot.player1 == undefined && snapshot.player2 == undefined)
                || (snapshot.player1 == Auth.user.uid && snapshot.player2 == undefined)
                || snapshot.player2 == Auth.user.uid && snapshot.player1 == undefined)
                await addUser()

            if (snapshot.player1 && snapshot.player2)
                await addSpectator()
        }

        async function removeUserOrSpectator() {
            if (!router.query.boardID || Array.isArray(router.query.boardID) || !Auth || !Auth.user) return
            const snapshot = (await GetDB.getBoardRef(router.query.boardID)).val()

            if (snapshot.player1 == Auth.user.uid)
                await RemoveDB.removePlayerBoardID(router.query.boardID, "player1")
            if (snapshot.player2 == Auth.user.uid)
                await RemoveDB.removePlayerBoardID(router.query.boardID, "player2")
            await RemoveDB.removeSpectatorBoardID(router.query.boardID, Auth.user.uid)
            await RemoveDB.removeUserBoardID(router.query.boardID, Auth.user.uid)
        }

        addUserOrSpectator()

        return () => { removeUserOrSpectator() }

    }, [router.isReady])




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