import styles from "./index.module.scss"

export default function Slot<T extends string, F extends (line: number) => void, I extends number>({ ch, UpdateBoard, index }: { ch: T, UpdateBoard: F, index: I }) {

    return <section onClick={() => UpdateBoard(index)} className={styles["section"]}>

        {ch ? "" : ""}

    </section>
}