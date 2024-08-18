import React from 'react'
import { LuShoppingCart } from "react-icons/lu";

type priceProp = {
  totalCartItem: number;
  handleToggleCart: () => void;
}

const Header: React.FC<priceProp> = ({totalCartItem, handleToggleCart}) => {
  return (
    <header className='relative flex items-center justify-between py-8'>
      <h1 className='text-2xl font-bold text-Brand'>Thirteen
        <span className='text-Dark font-medium text-xl'>store</span>
      </h1>
      <button 
        className={` relative  mr-1 cursor-pointer`}
        onClick={() => handleToggleCart()}
      >
        <LuShoppingCart className='size-9 '/>
        <div className='absolute w-[25px] h-[18px] overflow-hidden bg-Brand 
          flex -top-[2px] left-4 rounded-full'>
          <p className='m-auto text-[13px] size-[18px] text-center pt-[2.8px] font-bold text-Light leading-none'>{totalCartItem}</p>
        </div>
      </button>
        
    </header>
  )
}

export  default Header
