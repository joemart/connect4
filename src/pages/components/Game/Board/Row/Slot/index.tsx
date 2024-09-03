import { useContext } from "react";
import styles from "./index.module.scss"

import { BoardContext } from "@/pages/components/Context/BoardContext/BoardContext";
import { AuthContext } from "@/pages/components/Context/AuthContext/AuthContext";
import { BoardIDContext } from "@/pages/components/Context/BoardIDContext/BoardIDContext";

import { get, ref } from "firebase/database"
import { db } from "@firebase/firebase";

export default function Slot<T extends string, I extends number>({ cell, index }: { cell: T, index: I }) {

    const UpdateBoard = useContext(BoardContext)?.UpdateBoard
    const board = useContext(BoardContext)?.board
    const Auth = useContext(AuthContext)
    const BoardID = useContext(BoardIDContext)?.id
    const BoardRef = ref(db, "/boards/" + BoardID)

    if (UpdateBoard)

        return <section onClick={() => {
            console.log(UpdateBoard)
            get(BoardRef).then(x => {
                //check who's turn it is
                if (x.val().player1 == Auth?.user?.uid) {
                    UpdateBoard(index
                        , "player" //authenticated player
                        , board
                    )
                    //change turn

                }
            })

        }} className={`${styles["section"]} ${cell == "R" ? styles["red"] : cell == "Y" ? styles["yellow"] : ""}`}></section>

}