import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext'
import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default function Loading() {
    const { mode } = useDarkLightMode()
    
    return (
        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color={mode === "dark" ? "#fff" : "#000"}
                secondaryColor={mode === "dark" ? "#fff" : "#000"}
                radius="12.5"
                ariaLabel="Loading..."
            />
        </div>
    )
}

