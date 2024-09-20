import { GetDB } from "@/utils/DBClass"
import { useState } from "react"
import styles from "./opponent.module.scss"
const Opponent = <T extends { setFlag: React.Dispatch<React.SetStateAction<boolean>> }>({ setFlag }: T) => {

    const [text, setText] = useState("")
    const [lobbies, setLobbies] = useState<string[]>([])

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        GetDB.getOpponent(text).then(async lobbies => await setLobbies(lobbies))
    }



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    return <section className={styles["section"]}>
        <div onClick={() => setFlag(false)} className={styles["close"]} ></div>
        <form onSubmit={onSubmit}>
            <input type="text" value={text} placeholder={"Type opponent..."} onChange={handleChange} />
            <button>Submit</button>
        </form>
        {lobbies.map(lobby => <div>{lobby}</div>)}
    </section>
}

export default Opponent