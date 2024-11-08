import styles from "./index.module.scss"
import { useContext } from "react"
import { BoardContext } from "@/pages/components/Context/BoardContext"
import { GetDB, SetDB } from "@/utils/DBClass"
import { AuthContext } from "@/pages/components/Context/AuthContext"
import { BoardIDContext } from "@/pages/components/Context/BoardIDContext"

const Drop = () => {
    const column = useContext(BoardContext)?.column
    const updateBoard = useContext(BoardContext)?.UpdateBoard
    const board = useContext(BoardContext)?.board
    const Auth = useContext(AuthContext)
    const BoardID = useContext(BoardIDContext)?.id

    const insertPiece = () => {

        if (!BoardID || Array.isArray(BoardID)) return

        GetDB.getBoardRef(BoardID).then(x => {
            //check who's turn it is
            const UID_Turn = x.val()[x.val()["turn"]]

            // console.log(x.val()[x.val()["turn"]])
            if (UID_Turn == Auth?.user?.uid) {

                if (updateBoard && typeof (column) == "number")
                    updateBoard(column, x.val().turn, board)
                //change turn

                SetDB.setTurn(BoardID, x.val()["turn"] == "player1" ? "player2" : "player1")
            }
        })


    }

    return <section className={styles["section"]} onClick={insertPiece}>Insert</section>
}

export default Drop