import { ImageDetails, ImageItem } from '@/src/lib/models'
import Image from 'next/image'
import React, { useEffect, useMemo, useState, useCallback, useContext } from 'react'
import { ArrowRight } from 'lucide-react';
import Loading from './Loading'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/src/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip"
import { Button } from '../ui/button';
import { getImageInfo } from '@/src/lib/fetchData';
import { GalleryContext } from '@/src/lib/GalleryContext';


export default function ImageHover({ image } : { image: ImageItem }) {
    const [infos, setInfos] = useState<ImageDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { favImages, toggleFav } = useContext(GalleryContext)


    const isFav = useMemo(() => {
        return favImages.map(img => img.id).includes(image?.id)
    }, [favImages, image?.id]);


    const handleToggleFav = useCallback(() => {
        toggleFav(image);
    }, [image, toggleFav]);


    useEffect(() => {
        getImageInfo(image?.id)
            .then((res: ImageDetails | null) => {
                setInfos(res)
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
            })
            .finally(() => setLoading(false))
    }, [image])




    return (
        <div className='h-full relative [&>.content]:hover:block [&>img]:hover:opacity-50'>
            {loading ? <Loading /> : <div className='absolute z-10 left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 text-white content w-3/4 lg:w-2/3 text-center hidden'>
                <p className="text-[14px] lg:text-[18px]">{infos?.title ?? image?.title ?? 'No title available'}</p>
                <div className='mt-10'>
                    <Sheet>
                        <SheetTrigger>
                            <div className='flex items-center gap-x-2 underline text-[12px] lg:text-xl'>
                                MORE INFOS <ArrowRight size={15} />
                            </div>
                        </SheetTrigger>
                        <SheetContent className="lg:max-w-[500px] lg:w-[500px] w-[80%] bg-black text-white [&>button>svg]:h-20 [&>button>svg]:w-20 px-10">
                            <SheetHeader className="">
                                <SheetTitle className='text-white text-[20px] mt-[50px]'>{infos?.title ?? image?.title ?? 'No title available'}</SheetTitle>
                            </SheetHeader>
                            <div className="mt-10 ">
                                <div className="px-10 py-5 lg:text-3xl text-[12px] *:my-10">
                                    <p><span className="font-bold">Artist :</span> {infos?.artist}</p>
                                    <p><span className="font-bold">Description :</span> {infos?.description}</p>
                                    <p><span className="font-bold">Year :</span> {infos?.dating}</p>
                                    <p><span className="font-bold">Place :</span> {infos?.placeOfCreation}</p>
                                    <p><span className="font-bold">Size :</span> {infos?.size_weight}</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className='mt-10 lg:pt-0 pt-10 absolute left-1/2 translate-x-[-50%] gap-x-2'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => {
                                    handleToggleFav()
                                }} variant="link" className="text-white">{isFav ? <FaHeart className='fill-red-600' size={20} />  : <CiHeart size={25} /> }</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className='text-xl'>Add To Favorite</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                </div>

            </div>}
            <Image
                src={image?.data.url}
                alt={image?.title}
                width={image?.data.width}
                height={image?.data.height}
                loading="lazy"
                className='h-full transition-opacity duration-300'
            />
        </div >
    )
}
