import Slot from "./Slot";
import styles from "./index.module.scss"


export default function Row<T extends string[]>({ row }: { row: T }) {

    //Check how to use UpdateBoard


    return (
        <section className={styles["row"]}>
            {row.map((cell, i) => {
                return <div className={styles["slot_wrapper"]}><Slot key={i} cell={cell} column={i} /></div>
            })}
        </section>
    );
}
