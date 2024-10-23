"use client";

import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext'
import React, { useEffect, useRef } from 'react'
import { toggleDarkLightModeAnimation } from '@/src/lib/animate';
import BottomBar from '../own/BottomBar';
import PreLoader from '../own/PreLoader';



export default function PageLayout( { children } : { children: React.ReactNode }) {
    const { mode } = useDarkLightMode()
    const bodyRef = useRef<HTMLBodyElement | null>(null)
    const isMounted = useRef<boolean>(false)


    useEffect(() => {
      if (!bodyRef.current) return
      
      if (!isMounted.current) {
        isMounted.current = true
        return
      }

      toggleDarkLightModeAnimation(bodyRef, mode)


    }, [mode, bodyRef])
    
  return (
    <body className='bg-black text-white border-white' ref={bodyRef}>
      <main className='overflow-x-hidden main'>
        {children}
      </main>
      <BottomBar />
      <PreLoader />
    </body>
  )
}
