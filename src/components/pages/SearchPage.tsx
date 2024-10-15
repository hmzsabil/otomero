"use client"


import { ImageItem } from '@/src/lib/models'
import React, { useEffect, useState } from 'react'
import GridImages from '../own/GridImages'
import HorizontalSlider from '../own/HorizontalSlider'
import BottomBar from '../own/BottomBar'
import { groupImages } from '@/src/lib/utils'

export default function SearchPage({ imgs }: { imgs: ImageItem[] }) {

    const [images, setImages] = useState<ImageItem[]>([])


    useEffect(() => {
        setImages(imgs)
    }, [imgs])

    
    return (
        <>
            {images.length > 4 ? <HorizontalSlider>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(images, 4)[0]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(images, 4)[1]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(images, 4)[2]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(images, 4)[3]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(images, 4)[4]} />
                </div>
            </HorizontalSlider> : <div className='h-[90vh] w-full'><GridImages imgs={images} /></div>}
            <BottomBar />
        </>
    )
}
