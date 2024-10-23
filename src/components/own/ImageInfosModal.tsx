'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/src/components/ui/sheet"
import { ArrowRight, X } from 'lucide-react';
import { ImageDetails, ImageItem } from '@/src/lib/models';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useDarkLightMode } from '@/src/contexts/DarkLightModeContext';
import { cn } from '@/src/lib/utils';
import Loading from './Loading'

export default function ImageInfosModal({ infos, image }: { infos: ImageDetails | null, image: ImageItem }) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState<boolean>(true)
    const modalRef = useRef<HTMLDivElement | null>(null);
    const { mode } = useDarkLightMode()

    const handleClickOutside = useCallback((event: any) => {
        if (!modalRef.current) return;

        if (!modalRef.current.contains(event.target)) {
            setOpen(false)
        }

    }, [modalRef])

    const handlePressEsc = useCallback((event: any) => {
        if (!modalRef.current) return;

        if (event.key === "Escape") {
            setOpen(false)
        }

    }, [modalRef])


    useEffect(() => {
        if (!infos) return

        setLoading(false)
    }, [infos])


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handlePressEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handlePressEsc);
        };
    }, [modalRef]);




    return (
        <Sheet open={open}>
            <SheetTrigger asChild>
                <div className="flex justify-center items-center gap-x-2 underline">
                    <Button aria-label={`More information about ${infos?.title ?? 'this image'}`} onClick={(e: any) => {
                        e.preventDefault();
                        setOpen(true);
                    }} variant='ghost' className='text-[12px] lg:text-xl hover:text-inerit hover:bg-transparent hoverGrow'>
                        MORE INFOS <ArrowRight size={15} />
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent aria-labelledby="modal-title" aria-describedby="modal-description" aria-modal="true" ref={modalRef} className={cn("lg:max-w-[600px] lg:w-[600px] w-[80%] px-10 overflow-y-scroll", mode === "dark" ? "bg-black text-white" : "bg-white text-black")}>
                {!loading && <>
                    <SheetClose aria-label='Close Modal' autoFocus asChild className='absolute top-0 right-0 m-10 hover:bg-transparent hover:text-inherit hoverGrow'>
                        <Button variant='ghost' onClick={(e: any) => {
                            e.preventDefault();
                            setOpen(false);
                        }}>
                            <X size={20} />
                        </Button>
                    </SheetClose>
                    <SheetHeader>
                        <SheetTitle id="modal-title" className='text-inherit text-[20px] mt-[50px] text-center'>{infos?.title ?? image?.title ?? 'No title available'}</SheetTitle>
                    </SheetHeader>
                    <div className='w-full my-10'>
                        <Image
                            src={image.data.url}
                            alt={image.title}
                            height={image.data.height / 3}
                            width={image.data.width / 3}
                            className="w-[90%] m-auto" />
                    </div>
                    <div className="px-10 lg:text-3xl text-[12px] *:my-10">
                        <p><span className="font-bold">Artist :</span> {infos?.artist}</p>
                        <p id="modal-description"><span className="font-bold">Description :</span> {infos?.description}</p>
                        <p><span className="font-bold">Year :</span> {infos?.dating}</p>
                        <p><span className="font-bold">Place :</span> {infos?.placeOfCreation}</p>
                        <p><span className="font-bold">Size :</span> {infos?.size_weight}</p>
                    </div>
                </>}
                {loading && <Loading />}
            </SheetContent>
        </Sheet>
    )
}
