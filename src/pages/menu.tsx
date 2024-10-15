import Layout from "@/pages/components/layout"
import styles from "./menu.module.scss"
import Chat from "@/pages/components/Menu/chat"
import Options from "@/pages/components/Menu/options"
import BrowseLobbies from "./components/Menu/Browse"
import { useContext, useEffect } from "react"
import { AuthContext } from "./components/Context/AuthContext/AuthContext"
import type { User } from "./components/Profile/User.type"
import { SetDB, DisconnectDB, RemoveDB } from "@/utils/DBClass"


//Adds user to general chat in RTDB




const Menu = () => {
    const Auth = useContext(AuthContext)

    const ifAuthUser = (user: User) => {
        SetDB.setUser(user, { displayName: user.displayName, photo: user.photo, email: user.email })
        DisconnectDB.MenuDC(user)
    }
    const removeUser = () => {
        if (Auth && Auth.user)
            // remove(ref(db, "/users" + "/" + Auth?.user?.uid))
            RemoveDB.removeUserMenu(Auth.user)
    }

    useEffect(() => {
        if (Auth && Auth.user) {
            ifAuthUser(Auth.user)
        }
        return removeUser
    }, [])



    return <section className={styles["section"]}>
        <Chat></Chat>
        <Options></Options>
        <BrowseLobbies />
        {/* Browse lobbies */}
    </section>
}




export default Menu

Menu.getLayout = (children: React.ReactElement) => {
    return <Layout>{children}</Layout>
}