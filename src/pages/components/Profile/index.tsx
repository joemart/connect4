import styles from "./index.module.scss"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AuthContext } from "../Context/AuthContext/AuthContext"
import MyCustomLoader from "../imageLoader/CustomLoader"
import { db } from "@firebase/firebase"
import { get, onValue, ref } from "firebase/database"
import Pencil from "@/../public/pencil.svg"

import type { User } from "./User.type"

const Profile = <T extends { openProfile: boolean, setOpenProfile: Dispatch<SetStateAction<boolean>> }>({ openProfile, setOpenProfile }: T) => {
    const userID = "sApzFrtf6iZVLapBVCxxsBu2mEo2"

    const userRef = ref(db, "/users/" + userID)
    const [user, setUser] = useState<User | undefined>()

    const regex = /(.*) (.*)/
    const match = user?.displayName.match(regex)

    useEffect(() => {
        get(userRef).then(v => setUser(v.val()))
    }, [])

    return <section className={`${styles["section"]} ${styles[`${openProfile ? "profile" : "profile_hide"}`]}`} >

        <div className={styles["edit_profile"]}>

            {user ? <MyCustomLoader src={user.photo} className={styles["image"]}></MyCustomLoader> : "N/A"}
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