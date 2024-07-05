import { useState } from "react"
import styles from "./index.module.scss"

export default function SignIn() {

    const [values, setValues] = useState({
        name: "",
        email: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(v => { return { ...v, [e.target.name]: e.target.value } })
    }
    return <section className={styles.section}>
        <h1>Create account</h1>
        <form className={styles["inputCredentials"]}>
            {(Object.entries(values).map(([name, value]) => {
                return <>
                    <label htmlFor={name}>{name}:</label>
                    <input type={name == "email" ? "email" : "text"} id={name} name={name} value={value} onChange={handleChange} />
                </>
            }))}
            <button type="submit">Register</button>
        </form>
    </section>
}