import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@firebase/firebase"
import { AuthType } from "./Auth.types";
import { type User, signOut, onAuthStateChanged, PhoneAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { type User as ProfUser } from "../../Profile/User.type";

export const AuthContext = createContext<AuthType | undefined>(undefined)

export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<ProfUser | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const logOut = () => {
        signOut(auth)
        router.push("/")
    }

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser({ displayName: user.displayName as string, email: user.email as string, photo: user.photoURL as string, uid: user.uid })
                setLoading(false)
            }
        })

        return unsub
    }, [user])

    if (loading) return <>Loading...</>
    else return <AuthContext.Provider value={{ user, logOut }}>{children}</AuthContext.Provider>

}


