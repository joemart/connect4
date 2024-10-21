import { createContext, useEffect, useState } from "react";

import AuthType from "./Auth";
import { useRouter } from "next/router";
import type ProfUser from "../../Profile/User";
import { AuthUtil } from "@/utils/DBClass";

export const AuthContext = createContext<AuthType | undefined>(undefined)



const AuthContextProvider = <T extends { children: React.ReactNode }>({ children }: T): React.ReactNode => {

    const [user, setUser] = useState<ProfUser | null>(null)
    const router = useRouter()

    // let userRef: DatabaseReference

    // userRef = RefUtil.userIDRef(user)
    const logOut = async () => {

        AuthUtil.utilSignOut().then(() => {
            if (user) {
                AuthUtil.utilSignOutRemoveUser(user, {})
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
                await setUser(null)
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

export default AuthContextProvider