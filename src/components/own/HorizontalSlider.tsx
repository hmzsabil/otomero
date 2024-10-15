'use client'

import React, { useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlider({ children }: { children: React.ReactNode }) {


    const animate = useCallback(() => {
        const sections = gsap.utils.toArray(".slide");

        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".horizontal-sliders",
                pin: ".main",
                pinSpacing: true,
                scrub: 1,
                end: "+=3000",
            }
        });
    }, [])



    useEffect(() => {
        animate()
    }, [])


    return (
        <div className="overflow-x-hidden main">
            <div className="flex flex-nowrap w-[500%] overflow-x-hidden gap-x-3">
                <>
                    {children}
                </>
            </div>
        </div>
    )
}
