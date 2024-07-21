import { StaticImageData } from "next/image"

export type User ={
    displayName: string,
    email : string,
    photo : StaticImageData
}