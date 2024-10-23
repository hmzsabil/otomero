"use client";

import React from 'react'
import { BookHeart, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import SearchForm from './SearchForm'
import { Button } from '../ui/button'
import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext'
import TooltipLayout from './TooltipLayout';

export default function BottomBar() {
    const { mode, toggleMode } = useDarkLightMode()


    return (
        <footer className="fixed bottom-0 w-full lg:h-[10vh] lg:flex lg:justify-between lg:items-center px-10 pb-20 lg:pb-0">
            <div className='text-[25em] lg:mb-[25px] lg:translate-y-[-40px] translate-y-[-20px] flex items-end'>
                <Link aria-label='logo otomoro - go to home page' href={'/'}>OTOMORO</Link>
                <span className='lg:text-[30px] text-[16px] lg:translate-y-[-70px]'>Museum</span>
            </div>
            <div className='flex justify-between lg:justify-end items-center gap-x-20 lg:gap-x-3 w-3/4 mx-auto'>
                <TooltipLayout text={mode === "dark" ? "Switch to Light mode" : 'Switch to Dark mode'}>
                    <Button aria-label="switch light/dark mode" variant='ghost' className='hover:bg-transparent hover:text-inherit lg:hoverGrow' onClick={(e:any) => {
                        e.preventDefault();
                        toggleMode();
                    }}>
                        {mode === "light" ? <Moon aria-description='dark mode button' size={20} /> : <Sun aria-description='light mode button' size={20} />}
                    </Button>
                </TooltipLayout>
                <TooltipLayout text='Go to my gallery'>
                    <Link className='lg:hoverGrow' aria-label="go to my gallery" href="/my_gallery">
                        <BookHeart aria-description='heart button' size={20} />
                    </Link>
                </TooltipLayout>
                <div>
                    <SearchForm />
                </div>
            </div>
        </footer>
    )
}
