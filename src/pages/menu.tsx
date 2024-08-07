import Layout from "@/pages/components/layout"
import styles from "./menu.module.scss"
import Chat from "@/pages/components/Menu/chat"
import Options from "@/pages/components/Menu/options"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/Context/AuthContext/AuthContext"
import { onDisconnect, ref, set } from "firebase/database"
import { db } from "@firebase/firebase"
import type { User } from "./components/Profile/User.type"

const ifAuthUser = async (user: User) => {
    const userRef = ref(db, "users/" + user.uid)
    await set(userRef, { displayName: user.displayName, photo: user.photo, email: user.email })
    onDisconnect(userRef).remove()
}

const Menu = () => {

    const Auth = useContext(AuthContext)
    if (Auth?.user) {
        ifAuthUser(Auth.user)
    }

    return <section className={styles["section"]}>
        <Chat></Chat>
        <Options></Options>
    </section>
}




export default Menu

Menu.getLayout = (children: React.ReactElement) => {
    return <Layout>{children}</Layout>
}