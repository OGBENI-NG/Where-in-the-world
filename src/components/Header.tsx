import React from 'react'
import { LuShoppingCart } from "react-icons/lu";

export default function Header() {
  return (
    <header className='flex items-center justify-between py-8'>
      <h1 className='text-2xl font-bold text-Brand'>Thirteen
        <span className='text-Dark font-medium text-xl'>store</span>
      </h1>
      <div className='relative mr-1'>
        <LuShoppingCart className='size-9 '/>
        <div className='absolute w-[25px] h-[18px] overflow-hidden bg-Brand 
          flex -top-[2px] left-4 rounded-full'>
          <p className='m-auto text-[12px] pt-[1px] font-bold text-Light leading-none'>8</p>
        </div>
      </div>
    </header>
  )
}
