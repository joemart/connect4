import styles from "./index.module.scss"

import Left from "./Left"
import Right from "./Right"
import Drop from "./Drop"

const Controls = () => {

    return <section className={styles["section"]}>
        {/* <Left /> */}
        <Drop />
        {/* <Right /> */}
    </section>
}

export default Controls