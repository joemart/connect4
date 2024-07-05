import styles from "./index.module.scss"

export default function Layout<T extends { children: React.ReactElement }>({ children }: T) {

    return <section className={styles["section"]}>
        {children}
    </section>
}