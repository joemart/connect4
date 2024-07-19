import styles from "./index.module.scss"
import Navbar from "../Navbar"
import { useRouter } from "next/router"

export default function Layout<T extends { children: React.ReactNode }>({ children }: T) {

    const router = useRouter()

    return <section className={styles["section"]}>

        {(router.pathname !== "/register" && router.pathname !== "/") ? <Navbar /> : <></>}
        <div className={styles["wrapper"]}>
            {children}
        </div>

    </section>
}
