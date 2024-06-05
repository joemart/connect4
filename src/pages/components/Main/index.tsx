import styles from "./index.module.scss"
import Board from "./Board"
import Chat from "./Chat"

const Main = () => {
    return <section className={styles["section"]}>
        <Chat></Chat>
        <Board></Board>
    </section>
}

export default Main