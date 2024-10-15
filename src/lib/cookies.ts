import React from 'react'
import { cookies } from 'next/headers';

export function setCookie(key: string, value: string, limit?: number){
    cookies().set(key, value, {
        maxAge: limit ?? 60 * 60 * 24 * 7
    })
}

export function getCookie(key: string){
    return cookies().get(key)
}

export function deleteCookie(key:string){
    cookies().delete(key)
}