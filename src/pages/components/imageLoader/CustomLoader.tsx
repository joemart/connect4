import Image, { type ImageLoader } from "next/image"
import { StaticImageData } from "next/image"



type MyCustomLoaderType = (props: CustomLoader) => React.ReactNode

type CustomLoader = {
    src: StaticImageData | string,
    className?: string,
    priority?: boolean,
    onClick?: () => void
    // width: number,
    // height: number
}

type ContainLoader = {
    src: StaticImageData | string,
    className?: string,
    onClick?: () => void,
    width: number
    height: number
}

type ContainLoaderType = (props: ContainLoader) => React.ReactNode

const MyImageLoader: ImageLoader = ({ src }) => {
    return src
}

/**
* Custom Image loader that is meant as a template.
* Change objectFit under 'style' to adjust how the image
* will be styled.
*
* Change the parent's element width and height to increase 
* or decrease the size of the image.
**/

export const FullScreenLoader: MyCustomLoaderType = (props) => {
    return <Image
        loader={MyImageLoader}
        alt="Fullscreen image"
        {...props}
        sizes="70vw"
        unoptimized
        onClick={props.onClick}
        style={{ objectFit: "contain" }}
        fill
    ></Image>
}

export const ContainLoader: ContainLoaderType = (props) => {
    return <Image
        loader={MyImageLoader}
        alt="Contain image"
        sizes="70vw"
        unoptimized
        onClick={props.onClick}
        style={{ objectFit: "contain" }}
        {...props}
    />
}

const MyCustomLoader: MyCustomLoaderType = (props) => {
    return <Image

        loader={MyImageLoader}
        alt="Custom loader"
        {...props}
        sizes="100vw"
        unoptimized
        onClick={props.onClick}
        // fill
        style={{ objectFit: "cover" }}
        width={1} //filler number
        height={1} //filler number
    //width and height will be replaced by the class
    />
}

export default MyCustomLoader