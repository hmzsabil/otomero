'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateSlider } from '@/src/lib/animate';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalSlider({ children }: { children: React.ReactNode }) {
    const sliderRef = useRef<HTMLDivElement | null>(null)

    



    useLayoutEffect(() => {
        if (!sliderRef.current) return;

        let ctx = animateSlider(sliderRef)
        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [children]);



    return (
        <div className="flex flex-nowrap w-[500%] overflow-x-hidden gap-x-3" ref={sliderRef}>
            <>
                {children}
            </>
        </div>
    )
}
