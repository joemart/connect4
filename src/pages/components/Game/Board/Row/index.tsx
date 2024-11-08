import Slot from "./Slot";
import styles from "./index.module.scss"
import { useContext } from "react"
import { BoardContext } from "@/pages/components/Context/BoardContext";


export default function Row<T extends string[], G extends number>({ row, column }: { row: T, column: G }) {

    const setColumn = useContext(BoardContext)?.setColumn
    //Check how to use UpdateBoard
    const handleClick = () => {

        if (setColumn)
            setColumn(column)
    }

    return (
        <section className={styles["row"]} onClick={handleClick}>
            {row ? row.map((cell, i) => {
                return <div className={styles["slot_wrapper"]}><Slot key={i} cell={cell} column={column} /></div>
            }) : ""}
        </section>
    );
}
