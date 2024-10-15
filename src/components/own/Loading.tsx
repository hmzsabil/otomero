import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

export default function Loading() {
    return (
        <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

