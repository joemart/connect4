import Slot from "../Slot";
import styles from "./index.module.scss"
import { BoardContext } from "../Context/BoardContext";
import { useContext } from "react"

export default function Row<T extends string[]>({ row }: { row: T }) {

    //Check how to use UpdateBoard
    const UpdateBoard = useContext(BoardContext)

    return (
        <section className={styles["row"]}>

            {row.map((cell, i) => {
                if (UpdateBoard)
                    return <Slot key={i} UpdateBoard={UpdateBoard} ch={cell} index={i} />
            })}
        </section>


    );
}
