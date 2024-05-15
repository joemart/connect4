import styles from "./index.module.scss"

export default function Slot<T, G, H>({ ch, x, y }: { ch: T, x: G, y: H }) {

    return <section className={styles["section"]}>

        {ch ? "" : ""}

    </section>
}