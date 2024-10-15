import SearchPage from '@/src/components/pages/SearchPage'
import { getImages } from '@/src/lib/fetchData'
import { NextRequest } from 'next/server'
import React from 'react'
import Link from 'next/link'

export default async function page(req: NextRequest) {
  const artist = (req as unknown as any).searchParams.artist

  const imgs = await getImages({artist})

  if (imgs.data === null){
    return (
      <>
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-[40px] flex items-center justify-center text-white">No data found</div>
        <div className='absolute w-full top-0 text-white lg:text-[200px] text-[50px] flex flex-col items-center justify-center'>
            <Link href={'/'}>OTOMORO</Link>
            <span className='lg:text-[30px] text-[16px] lg:translate-y-[-80px]'>Museum</span>
        </div>
      </>
    )
  }

  if (!artist || artist.length < 2) {
    return <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-[40px] flex items-center justify-center text-white">Artist must be at least 2 characters.</div>
  }


  return (
    <SearchPage imgs={imgs.data.artObjects}/>
  )
}
