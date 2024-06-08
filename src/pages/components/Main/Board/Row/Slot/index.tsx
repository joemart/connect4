import styles from "./index.module.scss"

export default function Slot<T extends string, F extends (line: number, player: string) => void, I extends number>({ cell, UpdateBoard, index }: { cell: T, UpdateBoard: F, index: I }) {

    return <section onClick={() => UpdateBoard(index,
        "player" //authenticated player
    )} className={`${styles["section"]} ${cell == "red" ? styles["red"] : cell == "yellow" ? styles["yellow"] : ""}`}></section>
}