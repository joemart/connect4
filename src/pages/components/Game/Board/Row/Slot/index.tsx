import { useContext } from "react";
import styles from "./index.module.scss"

import { BoardContext } from "@/pages/components/Context/BoardContext/BoardContext";
import { AuthContext } from "@/pages/components/Context/AuthContext/AuthContext";
import { BoardIDContext } from "@/pages/components/Context/BoardIDContext/BoardIDContext";

import { GetDB, SetDB } from "@/utils/DBClass";

export default function Slot<T extends string, I extends number>({ cell, index }: { cell: T, index: I }) {

    const UpdateBoard = useContext(BoardContext)?.UpdateBoard
    const board = useContext(BoardContext)?.board
    const Auth = useContext(AuthContext)
    const BoardID = useContext(BoardIDContext)?.id


    if (UpdateBoard)

        return <section onClick={() => {

            if (!BoardID || Array.isArray(BoardID)) return
            GetDB.getBoardRef(BoardID).then(x => {
                //check who's turn it is
                const UID_Turn = x.val()[x.val()["turn"]]

                // console.log(x.val()[x.val()["turn"]])
                if (UID_Turn == Auth?.user?.uid) {
                    UpdateBoard(index
                        , x.val().turn //authenticated player
                        , board
                    )
                    //change turn

                    SetDB.setTurn(BoardID, x.val()["turn"] == "player1" ? "player2" : "player1")
                }
            })

        }} className={`${styles["section"]} ${cell == "player1" ? styles["red"] : cell == "player2" ? styles["yellow"] : ""}`}></section>

}