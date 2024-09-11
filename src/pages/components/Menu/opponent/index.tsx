import { GetDB } from "@/utils/DBClass"
import { useState } from "react"
import styles from "./opponent.module.scss"
const Opponent = <T extends { setFlag: React.Dispatch<React.SetStateAction<boolean>> }>({ setFlag }: T) => {

    const [text, setText] = useState("")

    const onSubmit = () => {
        GetDB.getOpponent(text)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    return <section className={styles["section"]}>
        <div className={styles["close"]} onClick={() => setFlag(false)}>CLOSE</div>
        <form onSubmit={onSubmit}>
            <input type="text" value={text} onChange={handleChange} />
            <button>Submit</button>
        </form>
    </section>
}

export default Opponent