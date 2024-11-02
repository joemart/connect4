import { useEffect, useState } from "react"
import styles from "./index.module.scss"
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@firebase/firebase"

import MyCustomLoader from "@/pages/components/imageLoader/CustomLoader"
import { useRouter } from "next/router"
import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

export default function RegisterIn() {


    const [isMobile, setIsMobile] = useState(false)
    const ScreenSize = 700
    const router = useRouter()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [signInValues, setSignInValues] = useState({
        email: "",
        password: ""
    })

    const [isLogin, setIsLogin] = useState(false)

    const reRoute = "/"

    const handleCreateAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(v => { return { ...v, [e.target.name]: e.target.value } })
    }

    const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInValues(v => { return { ...v, [e.target.name]: e.target.value } })
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

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, values.email, values.password).then(() => {
            router.push(reRoute)
        })

    }

    const handleLogIn = (e: React.FormEvent) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, signInValues.email, signInValues.password).then(() => {
            router.push(reRoute)
        })
    }

    const Mobile = () => {
        return isMobile ? <div className={styles["signUpWithPhone"]}>
            Sign up with Phone
            <MyCustomLoader className={styles["Icon"]} src={"phoneIcon.svg"}></MyCustomLoader>
        </div> : <></>
    }

    const SignUp = () => {
        return <form className={styles["inputCredentials"]} onSubmit={handleSignUp}>

            {(Object.entries(values).map(([name, value]) => {

                return <>
                    <label htmlFor={name}>{name}</label>
                    <input type={name == "email" ? "email" : "password"} id={name} name={name} value={value} onChange={handleCreateAccountChange} />
                </>
            }))}
            <button type="submit">Create</button>
        </form>
    }

    const CreateAccount = () => {
        return <>
            <h1>Create account</h1>
            {SignUp()}
            <div className={styles["divider"]} />
            <div className={styles["signUpWithGoogle"]} onClick={handleGoogle}>
                Sign up with Google
                <MyCustomLoader className={styles["Icon"]} src={"googleIcon.svg"}></MyCustomLoader>
            </div>
            <Mobile />
            <div className={styles["divider"]} />
            <div className={styles["logInSignIn"]} onClick={() => setIsLogin(true)}>Log in</div>
        </>
    }

    const LogIn = () => {
        return <>
            <h1>Log In</h1>
            <form className={styles["inputCredentials"]} onSubmit={handleLogIn}>
                {Object.entries(signInValues).map(([name, value]) => {
                    return <>
                        <label htmlFor={name}>{name}</label>
                        <input type={name == "email" ? "email" : "password"} id={name} name={name} value={value} onChange={handleSignInChange} />
                    </>
                })}
                <button type="submit">Log In</button>
            </form>
            <div className={styles["divider"]} />
            <div className={styles["logInSignIn"]} onClick={() => setIsLogin(false)}>Create account</div>
        </>
    }


    useEffect(() => {
        setIsMobile(window.innerWidth < ScreenSize ? true : false)
    }, [])

    return <section className={styles["section"]}>
        <div className={styles["container"]}>
            {isLogin ? <>{LogIn()}</> : <>{CreateAccount()}</>}
        </div>
    </section>
}

RegisterIn.layout = <T extends React.ReactNode>(page: T) => {
    return page
}