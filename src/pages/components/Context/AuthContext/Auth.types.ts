// import {type User} from "firebase/auth"
import {type User} from "@/pages/components/Profile/User.type"
export type AuthType = {
    user: null | User,
    logOut : () => void
}