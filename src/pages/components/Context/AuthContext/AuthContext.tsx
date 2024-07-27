import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@firebase/firebase"
import { AuthType } from "./Auth.types";
import { type User, signOut, onAuthStateChanged, PhoneAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { type User as ProfUser } from "../../Profile/User.type";

export const AuthContext = createContext<AuthType | undefined>(undefined)

export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<ProfUser | null>(null)
    const router = useRouter()

    const logOut = async () => {
        await signOut(auth)
        router.push("/")
    }

    useEffect(() => {

        return onAuthStateChanged(auth, async (u) => {
            if (u) {
                setUser({ displayName: u.displayName as string, email: u.email as string, photo: u.photoURL as string, uid: u.uid })

            } else setUser(null)
        })

    }, [])

    return <AuthContext.Provider value={{ user, logOut }}>{children}</AuthContext.Provider>

}


