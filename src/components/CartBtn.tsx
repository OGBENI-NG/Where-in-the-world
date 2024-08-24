import React from "react";
import { ThirteenStoreData } from "../data";
import { HiPlus, HiMinus} from "react-icons/hi";
import { MdAddShoppingCart } from "react-icons/md";

type CartBtnProps = {
  className?: string;
  showIncrement: { [key: string]: boolean };
  addToCart: (item: ThirteenStoreData) => void;
  item: ThirteenStoreData;
  cart: ThirteenStoreData[];  
  updateItemQuantity: (item: ThirteenStoreData) => void; 
  removeFromCart: (item: ThirteenStoreData) => void; 
  quantityBtnStyle: string;
  addToCartBtnInPreview: string;
}

const CartBtn: React.FC<CartBtnProps> = ({
  className = "",
  item,
  cart,
  addToCart,
  showIncrement,
  removeFromCart,
  updateItemQuantity,
  quantityBtnStyle,
  addToCartBtnInPreview

  }) => {

  const quantity = (cart.find(cartItem => cartItem.id === item.id)?.quantity || 1);
  const btnStyle: string = `lg:hover:bg-Lightest rounded-full border-2 lg:border-[1.5px] border-Lightest p-[1px] lg:hover:text-Brand`;

  return(
    <div className={` block
        z-20 w-[145px] lg:w-[110px] h-10 lg:h-8 leading-none ${className}`}>
      {showIncrement[item.id] ? (
        <div className={`flex items-center justify-between gap-8 bg-Brand lg:gap-4
          z-50 py-[7px] px-[10px] rounded-lg text-Lightest ${quantityBtnStyle}
          w-full h-full ${showIncrement[item.id] && "animate-fadeIn" } `}>
          <button
            onClick={() => removeFromCart(item)} 
            type='button' 
            className={btnStyle}>
            <HiMinus className='size-4 lg:size-3' />
          </button>
          <span className='text-[14px] font-bold size-4 pt-[2px] leading-none'>
            {quantity}
          </span>
          <button
            onClick={() => updateItemQuantity(item)} 
            type='button' 
            className={btnStyle}
          >
            <HiPlus className='size-4 lg:size-3'/>
          </button>
        </div>
      ) : (
        <button 
          onClick={() => addToCart(item)}
          type='button' 
          className={`${addToCartBtnInPreview} flex items-center justify-center 
            gap-[8px] w-full h-full lg:px-2 lg:gap-[3px]  leading-none
          text-base font-semibold overflow-x-hidden lg:text-[13px]
          border-[1.5px] border-Brand/50 bg-Lightest py-1 px-4 rounded-lg
          lg:hover:text-Brand lg:hover:border-Brand transition-colors duration-200`}>
          <MdAddShoppingCart className='size-[20px] lg:size-[14px] text-Brand'/> 
          Add to cart
        </button>
      )}
    </div>
  )      
} 

export default CartBtn