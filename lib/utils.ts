import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials=(name:string):string=>name
  .split(separator="")string[]
  .map((part)=>part[0])
  .join("")string
  .toUppercase()
  .slice(0,2); 