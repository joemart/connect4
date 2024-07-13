import {type User} from "firebase/auth"
export type AuthType = {
    user: null | User,

    logOut : () => void
}