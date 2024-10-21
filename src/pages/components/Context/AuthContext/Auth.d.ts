// import {type User} from "firebase/auth"
import type User from "@/pages/components/Profile/User"
type AuthType = {
    user: null | User,
    logOut : () => void
}

export default AuthType