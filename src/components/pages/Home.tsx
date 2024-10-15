"use client";

import { APIResponse, ImageItem } from '@/src/lib/models'
import React, { useEffect, useRef, useState } from 'react'
import { groupImages } from '@/src/lib/utils';
import BottomBar from '../own/BottomBar';
import GridImages from '../own/GridImages';
import HorizontalSlider from '../own/HorizontalSlider';




export default function Home({ images }: { images: ImageItem[] }) {
    const [imgs, setImgs] = useState<ImageItem[]>([])




    useEffect(() => {
        setImgs(images)
    }, [images])





    return (
        <>
            <HorizontalSlider>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(imgs, 4)[0]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(imgs, 4)[1]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(imgs, 4)[2]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(imgs, 4)[3]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(imgs, 4)[4]} />
                </div>
            </HorizontalSlider>
            <BottomBar />
        </>
    )
}

