import { createContext, useEffect, useState } from "react";

import { AuthType } from "./Auth.types";
import { useRouter } from "next/router";
import { type User as ProfUser } from "../../Profile/User.type";
import { DatabaseReference, onDisconnect, ref, set } from "firebase/database";
import { AuthUtil, RefUtil } from "@/utils/DBClass";

export const AuthContext = createContext<AuthType | undefined>(undefined)



export const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<ProfUser | null>(null)
    const router = useRouter()

    let userRef: DatabaseReference

    userRef = RefUtil.userIDRef(user)
    const logOut = async () => {

        AuthUtil.utilSignOut().then(() => {
            if (user) {
                set(userRef, {})
            }
        })

    }

    useEffect(() => {
        return AuthUtil.utilOnAuthStateChanged(async (u) => {
            // console.log(u)
            if (u) {
                // onDisconnect(ref(db, "/users/" + u.uid)).remove()
                await setUser({ displayName: u.displayName as string, email: u.email as string, photo: u.photoURL as string, uid: u.uid })
            } else {
                setUser(null)
                router.push("/")
            }
        })
    }, [])

    // useEffect(() => {
    //     return () => {
    //         signOut(auth)
    //         set(userRef, {})
    //     }
    // }, [])

    // useEffect(() => {
    //     setUser(user)
    //     console.log(user)
    // }, [user])

    return <AuthContext.Provider value={{ user, logOut }}>{children}</AuthContext.Provider>

}


