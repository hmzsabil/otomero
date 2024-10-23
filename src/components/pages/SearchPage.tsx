"use client"


import { ImageItem } from '@/src/lib/models'
import React from 'react'
import GridImages from '../own/GridImages'
import HorizontalSlider from '../own/HorizontalSlider'
import { groupImages } from '@/src/lib/utils'

export default function SearchPage({ imgs }: { imgs: ImageItem[] }) {
    const groupedImgs = React.useMemo(() => groupImages(imgs, 4), [imgs]);



    if (imgs.length > 4) {
        return (
            <HorizontalSlider>
                {groupedImgs.map((group, i) => (
                    <div key={group.length} className='h-[90vh] w-full slide'>
                        <GridImages imgs={group} />
                    </div>
                ))}
            </HorizontalSlider>
        )
    }


    return (
        <div className='h-[90vh] w-full'>
            <GridImages imgs={imgs} />
        </div>
    )
}
