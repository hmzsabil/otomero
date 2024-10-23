"use client"

import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/src/components/ui/tooltip"
import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext'
import { cn } from '@/src/lib/utils'

export default function TooltipLayout({ children, text } : { children: React.ReactNode, text: string }) {
    const { mode } = useDarkLightMode()
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent className={cn( mode === "light" ? "bg-black text-white border-white" : "bg-white text-black border-black")}>
                    <p className='text-xl'>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
