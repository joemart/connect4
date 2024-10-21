import styles from "./index.module.scss"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import { useRouter } from "next/router"
import Profile from "@/pages/components/Profile"

const Navbar = () => {

    const router = useRouter()
    const Auth = useContext(AuthContext)

    const [openProfile, setOpenProfile] = useState(false)

    return <div className={styles["section_wrapper"]}>
        <Profile openProfile={openProfile} setOpenProfile={setOpenProfile}></Profile>
        <section className={styles["section"]}>
            <button onClick={() => router.push("/")}>Home</button>
            {Auth?.user ? <div className={styles["signed"]}><button onClick={() => setOpenProfile(v => !v)}>Profile</button><button onClick={() => Auth.logOut()}>Sign Out</button></div> : <button onClick={() => router.push("/register")}>Register in</button>}
        </section>
    </div>

}

export default Navbar