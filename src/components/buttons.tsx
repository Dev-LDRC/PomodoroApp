import React from "react"
import { twMerge } from "tailwind-merge"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   children: React.ReactNode
}

export default function Button({ children, ...props }: ButtonProps) {
   return (

      <button
         {...props}
         className={twMerge("bg-app_background text-app_contrast p-3 rounded-2xl drop-shadow-app_button hover:bg-app_primary active:translate-y-1.5 active:drop-shadow-none transition duration-75 ease-in-out cursor-pointer", props.className)}
      >

         {children}

      </button>

   )
}