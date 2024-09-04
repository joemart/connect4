import { auth, db } from "@firebase/firebase"
import { child, get, push, ref } from "firebase/database"
import { type User, Auth, onAuthStateChanged, signOut } from "firebase/auth"

import { type User as ProfUser } from "@/pages/components/Profile/User.type"

//variables
    const boardPath = "/boards"
    const usersPath = "/users/"

//refs
    const userIDRef = <T extends ProfUser | null>(user:T)=>ref(db, usersPath + user?.uid )
    const userRef = ref(db, usersPath)
//functions

    //Create boardID 
    const createBoardID = <T extends string | undefined>(uid:T) =>push(ref(db, boardPath), {player: uid}).key

    //Auth utilities
    const utilSignOut = () => signOut(auth)
    const utilOnAuthStateChanged = <T extends (u:User|null)=>void>(fn:T) => onAuthStateChanged(auth, fn)

    const getUserRef = <T extends string>(uid: T) => get(child(userRef, uid))

const AuthUtil = {
    utilSignOut,
    utilOnAuthStateChanged
}

const RefUtil = {
    userIDRef,
    userRef
}

export {createBoardID, AuthUtil, RefUtil, getUserRef}