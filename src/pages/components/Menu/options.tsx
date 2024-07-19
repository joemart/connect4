import styles from "./options.module.scss"

const Options = () => {

    return <div className={styles["section_wrapper"]}><section className={styles["section"]}>
        <button>Find opponent</button>
        <button>Create lobby</button>
        <button>Find specific opponent</button>
    </section>
    </div>
}

export default Options