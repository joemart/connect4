import Slot from "./Slot";
import styles from "./index.module.scss"


export default function Row<T extends string[], G extends number>({ row, column }: { row: T, column: G }) {

    //Check how to use UpdateBoard


    return (
        <section className={styles["row"]}>
            {row ? row.map((cell, i) => {
                return <div className={styles["slot_wrapper"]}><Slot key={i} cell={cell} column={column} /></div>
            }) : ""}
        </section>
    );
}
