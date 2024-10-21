import { useState } from "react"
import Link from "next/link"
import styles from "./index.module.scss"
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import { auth } from "@firebase/firebase"
import { db } from "@firebase/firebase"
import { set, ref, onDisconnect } from "firebase/database"

import MyCustomLoader from "@/pages/components/imageLoader/CustomLoader"
import { useRouter } from "next/router"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

export default function RegisterIn() {



    const router = useRouter()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const reRoute = "/"



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(v => { return { ...v, [e.target.name]: e.target.value } })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const url = ""
        const requestOptions = {}

        fetch(url, requestOptions)
            .then(() => console.log("Submitted"))
            .catch(e => console.log(e))
    }

    const Auth = useContext(AuthContext)

    //issues with googleauthprovider
    const handleGoogle = async () => {
        try {
            if (!Auth?.user) {
                const provider = await new GoogleAuthProvider()
                const credentials = await signInWithPopup(auth, provider)
                // const userRef = ref(db, "users/" + credentials.user.uid)
                // await set(userRef, { displayName: credentials.user.displayName, photo: credentials.user.photoURL, email: credentials.user.email })
            }

        } catch (e) {
            console.log(e)

        }
        router.push(reRoute)
    }

    const handlePhone = () => {

    }

    return <section className={styles["section"]}>
        <div className={styles["container"]}>
            <h1>Create account</h1>
            <form className={styles["inputCredentials"]} >
                {(Object.entries(values).map(([name, value]) => {
                    return <>
                        <label htmlFor={name}>{name}</label>
                        <input type={name == "email" ? "email" : "text"} id={name} name={name} value={value} onChange={handleChange} />
                    </>
                }))}
                <button type="submit">Register</button>
            </form>
            <div className={styles["divider"]} />
            <div className={styles["signUpWithGoogle"]} onClick={handleGoogle}>
                Sign up with Google
                <MyCustomLoader className={styles["Icon"]} src={"googleIcon.svg"}></MyCustomLoader>
            </div>
            <div className={styles["signUpWithPhone"]}>
                Sign up with Phone
                <MyCustomLoader className={styles["Icon"]} src={"phoneIcon.svg"}></MyCustomLoader>
            </div>
            <div className={styles["divider"]} />
            <Link href={"/login"}>Log in</Link>
        </div>

    </section>
}

RegisterIn.layout = <T extends React.ReactNode>(page: T) => {
    return page
}