"use client";

import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Progress } from '../ui/progress'
import '@/src/lib/animation.css'
import { animatePreLoader } from '@/src/lib/animate';

export default function PreLoader({ delay }: { delay?: number }) {
    const [progress, setProgress] = useState(0)
    const containerRef = useRef<HTMLDivElement | null>(null)


    const delayPreset = delay ?? 0.5

    useEffect(() => {
        animatePreLoader(progress, containerRef)
    }, [progress])


    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + delayPreset;
                }
                return 100;
            });
        }, delayPreset * 10);
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='fixed top-0 h-screen w-screen bg-black text-white z-50' ref={containerRef}>
            <div className="w-full h-full relative flex justify-center items-center ">
                <div className='absolute bottom-10 left-0 translate-x-[30px]'>
                    <span className='text-[20em]'>{Math.floor(progress).toString().padStart(3, '0')}</span>
                </div>
                <div className='w-1/4'>
                    <Progress value={progress} className="h-5 bg-black border border-white [&>div]:bg-white" />
                </div>
            </div>
        </div>
    )
}
