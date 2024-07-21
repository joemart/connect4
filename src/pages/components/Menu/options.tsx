import styles from "./options.module.scss"

const Options = () => {

    return <div className={styles["section_wrapper"]}><section className={styles["section"]}>
        <button>Create lobby</button>
        <button>Find opponent</button>
        <button>Find specific opponent</button>
    </section>
    </div>
}

export default Options