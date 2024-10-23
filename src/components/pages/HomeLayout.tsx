"use client";

import { ImageItem } from '@/src/lib/models'
import React, { useEffect, useState } from 'react'
import { groupImages } from '@/src/lib/utils';
import PreLoader from '../own/PreLoader';
import GridImages from '../own/GridImages';
import HorizontalSlider from '../own/HorizontalSlider';
import NoResult from './NoResult';




export default function HomeLayout({ images }: { images: ImageItem[] }) {
    const groupedImgs = React.useMemo(() => groupImages(images, 4), [images]);

    if (!images || images.length === 0) {
        return <NoResult />
    }


    return (
        <>
            <HorizontalSlider>
                {groupedImgs.map((group, i) => (
                    <div key={i} className='h-[90vh] w-full slide'>
                        <GridImages imgs={group} />
                    </div>
                ))}
            </HorizontalSlider>
        </>
    )
}


