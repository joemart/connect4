import { StaticImageData } from "next/image"

type User ={
    uid : string,
    displayName: string,
    email : string,
    photo : string | StaticImageData
}
export default User