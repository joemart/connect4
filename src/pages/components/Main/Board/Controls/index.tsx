import styles from "./index.module.scss"

import Left from "../Controls/Left"
import Right from "../Controls/Right"
import Drop from "../Controls/Drop"

const Controls = () => {

    return <section className={styles["section"]}>
        <Left />
        <Drop />
        <Right />
    </section>
}

export default Controls