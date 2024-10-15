'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { ImageItem } from '../lib/models'


export default function useGallery() {
  const [favImages, setFavImages] = useState<ImageItem[]>([])

  const updateLocalStorage = useCallback((newFavs: ImageItem[]) => {
    localStorage.setItem('favorites', JSON.stringify(newFavs))
    setFavImages(newFavs)
  }, [])


  const getFavImages = useCallback(() => {
    try{
      const stockedFavs = localStorage.getItem('favorites')
      if (stockedFavs){
        setFavImages(JSON.parse(stockedFavs))
      }
    } catch {
      setFavImages([])
    }
  }, [])

  const addToFav = useCallback((image: ImageItem) => {
    const currentFavs = favImages;
    if (!currentFavs.map((img: ImageItem) => img.id).includes(image.id)) {
      const newFavs = [...currentFavs, image];

      updateLocalStorage(newFavs)
    }
  }, [favImages, updateLocalStorage])

  const removeFromFav = useCallback((imageId: string) => {
    const curentFavs = favImages;
    const newFavs = curentFavs.filter((img: ImageItem) => img.id !== imageId);

    updateLocalStorage(newFavs)
  }, [favImages, updateLocalStorage])
  

  const toggleFav = useCallback((image: ImageItem) => {

    const isExist = favImages.map((img: ImageItem) => img.id).includes(image.id);
    if (isExist){
      removeFromFav(image.id)
    }
    else {
      addToFav(image)
    }
  }, [favImages, addToFav, removeFromFav])


  useEffect(() => {
    getFavImages()
  }, [])

  useEffect(() => {
    console.log(favImages)
  }, [favImages])


  return {
    favImages,
    setFavImages,
    toggleFav
  }

}
