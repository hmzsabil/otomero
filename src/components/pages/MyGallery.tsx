'use client';

import React, { useContext } from 'react'
import HorizontalSlider from '../own/HorizontalSlider';
import GridImages from '../own/GridImages';
import { groupImages } from '@/src/lib/utils';
import BottomBar from '../own/BottomBar';
import Link from 'next/link';
import { GalleryContext } from '@/src/lib/GalleryContext';

export default function MyGallery() {

    const { favImages } = useContext(GalleryContext)


    if (favImages.length === 0){
        return (
            <div className='w-full h-full flex items-center justify-center'>
                No Image Added to Favorites. <Link href='/'>Click Here To Go To The Main Galery.</Link>
            </div>
        )
    }



    return (
        <>
        {favImages.length > 4 ?
            <HorizontalSlider>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(favImages, 4)[0]} />
                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(favImages, 4)[1]} />

                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(favImages, 4)[2]} />

                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(favImages, 4)[3]} />

                </div>
                <div className='h-[90vh] w-full slide'>
                    <GridImages imgs={groupImages(favImages, 4)[4]} />

                </div>
            </HorizontalSlider>
            : <div className='h-[90vh] w-full'><GridImages imgs={favImages} /></div>}
            <BottomBar />
        </>
    )
}
