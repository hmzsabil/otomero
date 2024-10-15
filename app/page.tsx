import Home from '@/src/components/pages/Home'
import { getImages } from '@/src/lib/fetchData'
import React from 'react'

export default async function page() {

  const reqImages = await getImages()
  
  if (!reqImages.success || !reqImages.data) return 



  return (
      <Home images={reqImages.data.artObjects} />
  )
}
