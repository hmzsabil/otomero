import HomeLayout from '@/src/components/pages/HomeLayout'
import { getImages } from '@/src/lib/fetchData'
import React from 'react'


export default async function page() {

  const reqImages = await getImages()
  
  if (!reqImages.success || !reqImages.data) return 



  return (
      <HomeLayout images={reqImages.data.artObjects} />
  )
}
