import { useContext } from "react";
import styles from "./index.module.scss"

import { BoardContext } from "@/pages/components/Context/BoardContext/BoardContext";

export default function Slot<T extends string, I extends number>({ cell, index }: { cell: T, index: I }) {

    const UpdateBoard = useContext(BoardContext)

    if (UpdateBoard)
        return <section onClick={() => UpdateBoard(index,
            "player" //authenticated player
        )} className={`${styles["section"]} ${cell == "R" ? styles["red"] : cell == "Y" ? styles["yellow"] : ""}`}></section>

}