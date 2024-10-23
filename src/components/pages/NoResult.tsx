"use client";

import Link from 'next/link'
import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext';
import { Button } from '../ui/button'
import { cn } from '@/src/lib/utils';
import BottomBar from '../own/BottomBar';

export default function NoResult({ text }: { text?: string }) {
    const { mode } = useDarkLightMode()
    return (
            <div className='w-screen h-screen'>
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center text-[15em]">{text ?? "No data found"}</div>
                    <div className="text-center w-full mt-10">
                        <Link href="/">
                            <span className={cn("text-[18px] py-5 px-10 bg-transparent border rounded-lg border-dotted", mode === "dark" ? "border-white" : "border-black")}>Back To Gallery</span>
                        </Link>
                    </div>
                </div>
            </div>
    )
}
