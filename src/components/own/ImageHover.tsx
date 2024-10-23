import { ImageDetails, ImageItem } from '@/src/lib/models'
import Image from 'next/image'
import React, { useEffect, useMemo, useState, useCallback, useContext } from 'react'
import Loading from './Loading'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Button } from '../ui/button';
import { getImageInfo } from '@/src/lib/fetchData';
import { useGallery } from '@/src/contexts/GalleryContext';
import ImageInfosModal from './ImageInfosModal';
import TooltipLayout from './TooltipLayout';


export default function ImageHover({ image }: { image: ImageItem }) {
    const [infos, setInfos] = useState<ImageDetails | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const { favImages, toggleFav } = useGallery()


    const isFav = useMemo(() => {
        return favImages.map(img => img.id).includes(image?.id)
    }, [favImages, image?.id]);


    const handleToggleFav = useCallback(() => {
        toggleFav(image);
    }, [image, toggleFav]);


    useEffect(() => {
        if (!image) return
        getImageInfo(image.id)
            .then((res: ImageDetails | null) => {
                setInfos(res)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }, [image])


    if (loading) {
        return (
            <div className='h-full relative [&>.content]:hover:block [&>img]:hover:opacity-50'>
                <Loading />
            </div>
        )
    }

    return (
        <div className='h-full relative [&>.content]:hover:block [&>img]:hover:opacity-50'>
            <div className='absolute z-10 left-1/2 translate-x-[-50%] translate-y-[-50%] top-1/2 content w-3/4 lg:w-2/3 text-center hidden'>
                <h2 className="text-[14px] lg:text-[18px]">{infos?.title ?? image?.title ?? 'No title available'}</h2>
                <div className="flex justify-center items-center mt-10 hover:gap-x-10">
                    <TooltipLayout text='Add To Favorites'>
                        <Button aria-label='Add To Favorites' onClick={() => {
                            handleToggleFav()
                        }} variant="link" className="hoverGrow text-inherit">{isFav ? <FaHeart className='fill-red-600' size={20} /> : <CiHeart size={20} />}</Button>
                    </TooltipLayout>
                    <ImageInfosModal infos={infos} image={image} />
                </div>

            </div>
            <Image
                src={image?.data.url}
                alt={image?.title}
                width={image?.data.width}
                height={image?.data.height}
                loading="lazy"
                className='h-full transition-opacity duration-300 object-cover'
            />
        </div >
    )
}
