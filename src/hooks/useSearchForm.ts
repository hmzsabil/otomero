"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'


export default function useSearchForm() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const router = useRouter()
  
    const handleSearchIconClick = useCallback(() => {
      setSearchOpen(true);
    }, [])
  
    
  
    const handleSearchCloseClick = useCallback(() => {
      setSearchOpen(false);
      setSearchValue("");
    }, [])
  
    const handleSearchDeleteClick = useCallback(() => {
      setSearchValue("");
    }, [])

    const formSchema = useMemo(() => z.object({
  artist: z.string().min(2, {
    message: "Artist must be at least 2 characters.",
  }),
}), [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artist: "",
    }
  })

  const onSearchSubmit = useCallback((values: z.infer<typeof formSchema>) => {
    if (!values.artist || values.artist.length < 2) {
      return
    }
    const url = '/search?artist=' + values.artist

    router.push(url)
  }, [])

  
  return {
    formSchema, form, onSearchSubmit, handleSearchCloseClick, handleSearchDeleteClick, handleSearchIconClick, searchOpen, setSearchOpen, searchValue, setSearchValue
  }
}
