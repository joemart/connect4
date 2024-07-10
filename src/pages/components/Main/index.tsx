import styles from "./index.module.scss"
import Board from "./Board"
import Chat from "./Chat"
import Reset from "@/utils/Reset"

import { db } from "@firebase/firebase"
import { ref, set, push, update, query, orderByValue, orderByKey, orderByChild, get, limitToFirst } from "firebase/database"

import { AuthContextProvider } from "@/pages/components/Context/AuthContext/AuthContext"
import { AuthContext } from "@/pages/components/Context/AuthContext/AuthContext"
import { useContext } from "react"

const Main = () => {

    //Resume from auth context
    const Auth = useContext(AuthContext)

    const NewUser = (user: string, address: string, age: number, height: number) => {
        update(ref(db, "users"), { [user]: { address, age, height } })
    }

    const Child = async () => {

        const children = query(ref(db, "users"), orderByChild("age"))
        const val = (await get(children)).val()
        console.log(val)

    }

    return <section className={styles["section"]}>

        {/* <button onClick={Child}>Child</button> */}

        {/* <button onClick={() => NewUser("Lilly", "In a tree", 34, 159)}>New User</button> */}

        {/* Make a turn based game */}
        <button onClick={Reset}>Reset</button>
        <Chat></Chat>
        <Board></Board>

    </section>
}

export default Main

Main.getLayout = <T extends { children: React.ReactNode }>({ children }: T) => {
    return <AuthContextProvider>{children}</AuthContextProvider>
}