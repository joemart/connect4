import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@firebase/firebase"
import { AuthType } from "./Auth.types";
import { type User, signOut, onAuthStateChanged, PhoneAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export const AuthContext = createContext<AuthType | undefined>(undefined)

export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const logOut = () => {
        signOut(auth)
        router.push("/")
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            setUser(user)
            setLoading(false)
        })

        return unsub
    }, [user])

    return <AuthContext.Provider value={{ user, logOut }}>{!loading && children}</AuthContext.Provider>

}


