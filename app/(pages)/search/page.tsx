import SearchPage from '@/src/components/pages/SearchPage'
import { getImages } from '@/src/lib/fetchData'
import { NextRequest } from 'next/server'
import React from 'react'
import Link from 'next/link'
import NoResult from '@/src/components/pages/NoResult'

export default async function page(req: NextRequest) {
  const artist = (req as unknown as any).searchParams.artist

  const imgs = await getImages({artist})

  if (imgs.data === null){
    return (
      <NoResult />
    )
  }

  if (!artist || artist.length < 2) {
    return <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center text-[40px] flex items-center justify-center text-white">Artist must be at least 2 characters.</div>
  }


  return (
    <SearchPage imgs={imgs.data.artObjects}/>
  )
}
