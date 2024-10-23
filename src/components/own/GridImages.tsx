import { ImageItem } from "@/src/lib/models"
import { useEffect, useState } from "react"
import Loading from "./Loading"
import ImageHover from "./ImageHover"



export default function GridImages({ imgs }: { imgs: ImageItem[] }) {
    const [images, setImages] = useState<ImageItem[]>([])

    const sortedByHeight = images.sort((a, b) => b.data.height - a.data.height)

    useEffect(() => {
        if (imgs) {
            setImages(imgs)
        }
    }, [imgs])

    if (images.length === 0) {
        return (
            <div className='h-full w-full'>
                <Loading />
            </div>
        )
    }


    return (
        <div className='w-full h-full'>
            <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-2">
                <div className="col-span-2 lg:row-span-4 row-span-2">
                    <ImageHover image={sortedByHeight[0]} />
                </div>
                <div className="lg:col-start-3 row-span-2 col-span-2 lg:col-span-1">
                    <ImageHover image={sortedByHeight[1]} />
                </div>
                <div className="lg:col-start-4 row-span-2 col-span-2 lg:col-span-1">
                    <ImageHover image={sortedByHeight[2]} />
                </div>
                <div className="lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-3 row-span-2 col-span-2 ">
                    <ImageHover image={sortedByHeight[3]} />
                </div>
            </div>
        </div>
    )
}