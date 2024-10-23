'use client';

import React from 'react'
import HorizontalSlider from '../own/HorizontalSlider';
import GridImages from '../own/GridImages';
import { groupImages } from '@/src/lib/utils';
import BottomBar from '../own/BottomBar';
import { useGallery } from '@/src/contexts/GalleryContext';
import NoResult from './NoResult';

export default function MyGallery() {
    const { favImages } = useGallery()
    const groupedImgs = React.useMemo(() => groupImages(favImages, 4), [favImages]);


    if (favImages.length === 0) {
        return <NoResult />
    }

    if (favImages.length > 4) {
        return (
                <HorizontalSlider>
                    {groupedImgs.map((group, i) => (
                        <div key={i} className='h-[90vh] w-full slide'>
                            <GridImages imgs={group} />
                        </div>
                    ))}
                </HorizontalSlider>
        )
    }



    return (
            <div className='h-[90vh] w-full'>
                <GridImages imgs={favImages} />
            </div>
    )
}
