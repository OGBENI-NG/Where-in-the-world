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
  isHoverStyle: string 
  quantityBtnStyle: string;
}

const CartBtn: React.FC<CartBtnProps> = ({
  className = "",
  item,
  cart,
  addToCart,
  showIncrement,
  removeFromCart,
  updateItemQuantity,
  isHoverStyle,
  quantityBtnStyle

  }) => {

  const quantity = (cart.find(cartItem => cartItem.id === item.id)?.quantity || 1);

  return(
    <div className={`${isHoverStyle} 
      -mt-[20px] relative z-20 w-[145px] h-10 ${className}`}>
      {showIncrement[item.id] ? (
        <div className={`flex items-center justify-between gap-8 bg-Brand
          z-50 relative py-[7px] px-[10px] rounded-lg text-Lightest ${quantityBtnStyle}
          w-full h-full ${showIncrement[item.id] ? "animate-flipinx":"opacity-0 transition-opacity duration-300" }`}>
          <button
            onClick={() => updateItemQuantity(item)} 
            type='button' 
            className='rounded-full border-2 border-Lightest p-[1px] '
          >
            <HiPlus className='size-4'/>
          </button>
            <span className='text-[14px] font-bold size-4 pt-[2px] leading-none'>
              {quantity}
            </span>
          <button
            onClick={() => removeFromCart(item)} 
            type='button' 
            className='rounded-full border-2 border-Lightest p-[1px]'>
            <HiMinus className='size-4'/>
          </button>
        </div>
      ) : (
        <button 
          onClick={() => addToCart(item)}
          type='button' 
          className={`flex items-center justify-center gap-[8px] w-full h-full
          text-base font-semibold overflow-x-hidden
          border-[1.5px] border-Brand/80 bg-Lightest py-1 px-4 rounded-lg`}>
          <MdAddShoppingCart className='size-[20px] text-Brand'/> 
          Add to cart
        </button>
      )}
    </div>
  )      
} 

export default CartBtn