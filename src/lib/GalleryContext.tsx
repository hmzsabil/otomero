'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ImageItem } from './models'




export const GalleryContext = createContext({
    favImages: [] as ImageItem[],
    toggleFav: (image: ImageItem) => {},
  })
  
  


export function GalleryProvider({children} : {children: React.ReactNode}) {
  const [favImages, setFavImages] = useState<ImageItem[]>([])

  const updateLocalStorage = useCallback((newFavs: ImageItem[]) => {
    localStorage.setItem('favorites', JSON.stringify(newFavs))
    setFavImages(newFavs)
  }, [])

  const getFavImages = useCallback(() => {
    try {
      const stockedFavs = localStorage.getItem('favorites')
      if (stockedFavs) {
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
      updateLocalStorage(newFavs);
    }
  }, [favImages, updateLocalStorage])

  const removeFromFav = useCallback((imageId: string) => {
    const currentFavs = favImages;
    const newFavs = currentFavs.filter((img: ImageItem) => img.id !== imageId);
    updateLocalStorage(newFavs);
  }, [favImages, updateLocalStorage])

  const toggleFav = useCallback((image: ImageItem) => {
    const isExist = favImages.some((img: ImageItem) => img.id === image.id);
    if (isExist) {
      removeFromFav(image.id);
    } else {
      addToFav(image);
    }
  }, [favImages, addToFav, removeFromFav])

  useEffect(() => {
    getFavImages()
  }, [getFavImages])

  return (
    <GalleryContext.Provider value={{ favImages, toggleFav }}>
      {children}
    </GalleryContext.Provider>
  );
}


export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}




