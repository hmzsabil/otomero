import React from 'react'
import { BookHeart } from 'lucide-react'
import Link from 'next/link'
import SearchForm from './SearchForm'

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 w-full h-[10vh] bg-black lg:flex lg:justify-between lg:items-center text-white px-10">
            <div className='lg:text-[200px] text-[50px] lg:mb-[60px] mt-[-40px] flex items-end'>
                <Link href={'/'}>OTOMORO</Link>
                <span className='lg:text-[30px] text-[16px] lg:translate-y-[-80px]'>Museum</span>
            </div>
            <div className='flex items-center gap-x-3'>
                <Link href="/my_gallery">
                    <BookHeart size={20} />
                </Link>
                <div>
                    <SearchForm />
                </div>
            </div>
        </div>
    )
}
