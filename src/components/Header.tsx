import React from 'react'
import { LuShoppingCart } from "react-icons/lu";
import { ThirteenStoreData } from '../data';
import Cart from './Cart';


type priceProp = {
  totalCartItem: number;
  handleToggleCart: () => void;
  toggleCart: boolean;
  cart: ThirteenStoreData[]
  totalPrice: string;
  removeFromCart: (item: ThirteenStoreData) => void;
  isRemoving: { [key: string]: boolean } 
 
}

const Header: React.FC<priceProp> = ({totalCartItem, handleToggleCart, toggleCart, totalPrice, cart, removeFromCart, isRemoving}) => {
  return (
    <header className=' relative flex items-center justify-between py-8'>
      <h1 className='text-2xl font-bold text-Brand'>Thirteen
        <span className='text-Dark font-medium text-xl'>store</span>
      </h1>
      <div 
        className='relative mr-1 cursor-pointer'
        onClick={() => handleToggleCart()}
      >
        <LuShoppingCart className='size-9 '/>
        <div className='absolute w-[25px] h-[18px] overflow-hidden bg-Brand 
          flex -top-[2px] left-4 rounded-full'>
          <p className='m-auto text-[14px] size-4 text-center pt-[1.4px] font-bold text-Light leading-none'>{totalCartItem}</p>
        </div>
      </div>
        <div className={`absolute z-50 bottom-0 top-20 w-full right-0 left-0  
          ${toggleCart ? "animate-fadeForward" : "opacity-0 -z-20 transition-opacity duration-300"}`}>
          <Cart 
            cart={cart}
            totalPrice={totalPrice}
            toggleCart={toggleCart}
            removeFromCart={removeFromCart}
            isRemoving={isRemoving}
          />
      </div>
    </header>
  )
}

export  default Header
