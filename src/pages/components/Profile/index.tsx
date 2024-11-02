import styles from "./index.module.scss"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext"
import MyCustomLoader from "../imageLoader/CustomLoader"

import { OnValueDB } from "@/utils/DBClass"
import Pencil from "@/../public/pencil.svg"

import type User from "./User"

const Profile = <T extends { openProfile: boolean, setOpenProfile: Dispatch<SetStateAction<boolean>> }>({ openProfile, setOpenProfile }: T) => {

    const [user, setUser] = useState<User | undefined>()

    const regex = /(.*) (.*)/

    const Auth = useContext(AuthContext)
    const match = Auth?.user?.displayName.match(regex)

    useEffect(() => {

        return OnValueDB.menuUsersOnValue(snapshot => {
            if (Auth && Auth.user && snapshot.exists())
                setUser(snapshot.val()[Auth.user.uid])
        })
    }, [Auth?.user?.uid])

    return <section className={`${styles["section"]} ${styles[`${openProfile ? "profile" : "profile_hide"}`]}`} >

        <div className={styles["edit_profile"]}>

            {user ? <MyCustomLoader src={user.photo} className={styles["image"]} /> : "N/A"}
            <div>
                <span className={styles["close"]} onClick={() => setOpenProfile(v => !v)}>Close</span>
                <button>Edit profile <Pencil></Pencil></button>
            </div>
        </div>
        <div className={styles["personal_details"]}>
            <span>First name : {match ? match[1] : "N/A"}</span>
            <span>Last name : {match ? match[2] : "N/A"}</span>
        </div>
        <div className={styles["game_details"]}>
            <span>Games played</span>
            <span>Games won</span>
            <span>Games lost</span>
        </div>
    </section>
}

export default Profile