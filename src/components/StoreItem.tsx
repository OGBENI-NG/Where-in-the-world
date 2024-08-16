import React, { useState } from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { HiPlus, HiMinus} from "react-icons/hi";
import { ThirteenStoreData } from '../data';

type StoreItemProps = {
  item: ThirteenStoreData;
  showIncrement: { [key: string]: boolean }; // Object to track which items have the increment/decrement buttons displayed
  cart: ThirteenStoreData[]; // Array of items in the cart
  addToCart: (item: ThirteenStoreData) => void; // Function to add item to the cart
  updateItemQuantity: (item: ThirteenStoreData) => void; // Function to increase the item quantity in the cart
  removeFromCart: (item: ThirteenStoreData) => void; // Function to decrease the item quantity in the cart
};

const StoreItem: React.FC<StoreItemProps> = ({ 
  item,
  showIncrement,
  cart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
 }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
   
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isHoverStyle =  `transition-opacity duration-300  
    ${isHovered ? 'opacity-0' : 'opacity-100'}`

  return (
    <section >
      <article>
        <div className='relative bg-Lightest mt-5 pt-3 rounded-lg'>
          <div className='flex flex-col justify-center items-center group'>
            <div 
              className='size-[200px] cursor-pointer'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                src={item.image[0]} 
                alt={`${item.name}-image`}  
                className='h-full w-full object-cover'
              />
              <div className={`absolute top-0 left-0 right-0 bottom-[52px] w-full 
                text-Dark bg-Lightest/70 rounded-t-lg z-10 transition-opacity duration-300
                  ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <TbListDetails className='size-12 block m-auto mt-20'/>
                <div className='absolute bottom-1 left-5'>
                  <h2 className='text-xl font-medium '>{item.name}</h2>
                  <p className='text-2xl font-medium pt-2'>{item.description}</p>
                </div>
              </div>
            </div>
            {/* button line */}
            <div className={`px-5 w-full ${isHoverStyle}`}>
              <div className='h-[1px] w-full bg-Brand/80 mt-8'></div>
            </div>
            <div className={`${isHoverStyle} 
              -mt-[20px] relative z-20 w-[145px] h-10 #j`}>
              {showIncrement[item.id] ? (
                <div className={`flex items-center justify-center gap-8 bg-Brand
                  z-50 relative py-[7px] px-[10px] rounded-lg text-Lightest 
                  w-full h-full ${showIncrement[item.id] ? "animate-flipinx":"opacity-0 transition-opacity duration-300" }`}>
                  <button
                      onClick={() => updateItemQuantity(item)} 
                      type='button' 
                      className='rounded-full border-2 border-Lightest p-[1px] '
                    >
                    <HiPlus className='size-4'/>
                  </button>
                    <span className='text-[14px] font-bold size-4 pt-[2px] leading-none'>
                      {cart.find(cartItem => cartItem.id === item.id)?.quantity || 1}
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
                  className={`flex items-center gap-[8px] w-full h-full
                  text-base font-semibold overflow-x-hidden
                  border-[1.5px] border-Brand/80 bg-Lightest py-1 px-4 rounded-lg`}>
                  <MdAddShoppingCart className='size-[20px] text-Brand'/> 
                  Add to cart
                </button>
              )}
            </div>
          </div>
          <p className='px-5 pb-4 pt-3 text-xl font-bold text-Darkest'>${item.price.toFixed(2)}</p>
        </div>
      </article>
    </section>
  );
};

export default StoreItem;
