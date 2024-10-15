import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ImageItem } from "./models";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const groupImages = (images: ImageItem[], size: number) => {
  const result = [];
  for (let i = 0; i < images.length; i += size) {
    result.push(images.slice(i, i + size));
  }
  return result;
};