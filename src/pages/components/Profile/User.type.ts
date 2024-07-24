import { StaticImageData } from "next/image"

export type User ={
    uid : string,
    displayName: string,
    email : string,
    photo : string | StaticImageData
}