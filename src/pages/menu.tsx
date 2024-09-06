import Layout from "@/pages/components/layout"
import styles from "./menu.module.scss"
import Chat from "@/pages/components/Menu/chat"
import Options from "@/pages/components/Menu/options"
import { useContext } from "react"
import { AuthContext } from "./components/Context/AuthContext/AuthContext"
import type { User } from "./components/Profile/User.type"
import { SetDB, DisconnectDB } from "@/utils/DBClass"

const ifAuthUser = async (user: User) => {
    SetDB.setUser(user, { displayName: user.displayName, photo: user.photo, email: user.email })
    DisconnectDB.MenuDC(user)
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