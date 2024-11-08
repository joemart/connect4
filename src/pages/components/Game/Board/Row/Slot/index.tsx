import styles from "./index.module.scss"

export default function Slot<T extends string, I extends number>({ cell, column }: { cell: T, column: I }) {
    return <section className={`${styles["section"]} ${cell == "player1" ? styles["red"] : cell == "player2" ? styles["yellow"] : ""}`}></section>
}