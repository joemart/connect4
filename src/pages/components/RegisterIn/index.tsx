import { useState } from "react"
import Link from "next/link"
import styles from "./index.module.scss"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@firebase/firebase"

import MyCustomLoader from "@/pages/components/imageLoader/CustomLoader"


export default function RegisterIn() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

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

    //issues with googleauthprovider
    const handleGoogle = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)

                if (credential) {
                    const token = credential.accessToken
                    const user = result.user

                    console.log(credential)
                }
            }).catch((e) => {
                // console.log(e)
            })
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