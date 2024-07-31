import { createContext, useContext, useEffect, useState } from "react";

import { auth, db } from "@firebase/firebase"
import { AuthType } from "./Auth.types";
import { type User, signOut, onAuthStateChanged, PhoneAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { type User as ProfUser } from "../../Profile/User.type";
import { DatabaseReference, onDisconnect, onValue, ref, set } from "firebase/database";


export const AuthContext = createContext<AuthType | undefined>(undefined)

export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<ProfUser | null>(null)
    const router = useRouter()

    let userRef: DatabaseReference

    userRef = ref(db, "/users/" + user?.uid)
    const logOut = async () => {

        signOut(auth).then(() => {
            if (user) {

                set(userRef, {})
            }
        })

    }

    useEffect(() => {
        return onAuthStateChanged(auth, async (u) => {
            if (u) {
                onDisconnect(ref(db, "/users/" + u.uid)).remove()
                setUser({ displayName: u.displayName as string, email: u.email as string, photo: u.photoURL as string, uid: u.uid })
            } else {
                setUser(null)
                router.push("/")
            }
        })
    }, [])

    useEffect(() => {
        return () => {
            signOut(auth)
            set(userRef, {})
        }
    }, [])

    return <AuthContext.Provider value={{ user, logOut }}>{children}</AuthContext.Provider>

}


