import { useState } from "react"
import Link from "next/link"
import styles from "./index.module.scss"

import MyCustomLoader from "@/pages/components/imageLoader/CustomLoader"


export default function RegisterIn() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(v => { return { ...v, [e.target.name]: e.target.value } })
    }
    return <section className={styles["section"]}>
        <div className={styles["container"]}>
            <h1>Create account</h1>
            <form className={styles["inputCredentials"]}>
                {(Object.entries(values).map(([name, value]) => {
                    return <>
                        <label htmlFor={name}>{name}</label>
                        <input type={name == "email" ? "email" : "text"} id={name} name={name} value={value} onChange={handleChange} />
                    </>
                }))}
                <button type="submit">Register</button>
            </form>
            <div className={styles["divider"]} />
            <div className="signUpWithGoogle">
                Sign up with Google
                <MyCustomLoader className={styles["Icon"]} src={"googleIcon.svg"}></MyCustomLoader>
            </div>
            <div className="signUpWithPhone">
                Sign up with Phone
                <MyCustomLoader className={styles["Icon"]} src={"phoneIcon.svg"}></MyCustomLoader>
            </div>
            <div className={styles["divider"]} />
            <Link href={"/login"}>Log in</Link>
        </div>

    </section>
}