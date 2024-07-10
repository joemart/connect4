import { createContext, useEffect, useState } from "react";

import { auth } from "@firebase/firebase"
import { AuthType } from "./Auth.types";
import { type User, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, PhoneAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext<AuthType | null>(null)

export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {
    const [user, setUser] = useState<User | null>(null)

    const googleSignIn = () => {
        const googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setUser(user))
        return unsub()
    }, [user])

    return <AuthContext.Provider value={{ user, googleSignIn, logOut }}>{children}</AuthContext.Provider>

}

