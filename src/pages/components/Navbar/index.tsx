import styles from "./index.module.scss"
import { useContext, useEffect } from "react"
import { AuthContext } from "../Context/AuthContext/AuthContext"
import { useRouter } from "next/router"

const Navbar = () => {

    const router = useRouter()
    const Auth = useContext(AuthContext)



    return <div className={styles["section_wrapper"]}><section className={styles["section"]}>
        <button>Home</button>
        {Auth?.user ? <div className={styles["signed"]}><button onClick={() => router.push("/profile")}>Profile</button><button onClick={() => Auth.logOut()}>Sign Out</button></div> : <button onClick={() => router.push("/register")}>Register in</button>}
    </section>
    </div>
}

export default Navbar