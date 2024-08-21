import React, { useState } from 'react';
import { TbListDetails } from "react-icons/tb";
import { ThirteenStoreData } from '../data';
import CartBtn from './CartBtn';

type StoreItemProps = {
  item: ThirteenStoreData;
  showIncrement: { [key: string]: boolean }; // Object to track which items have the increment/decrement buttons displayed
  cart: ThirteenStoreData[]; // Array of items in the cart
  addToCart: (item: ThirteenStoreData) => void; // Function to add item to the cart
  updateItemQuantity: (item: ThirteenStoreData) => void; // Function to increase the item quantity in the cart
  removeFromCart: (item: ThirteenStoreData) => void; // Function to decrease the item quantity in the cart
  handleShowReview: (item: ThirteenStoreData) => void
};

const StoreItem: React.FC<StoreItemProps> = ({ 
  item,
  showIncrement,
  cart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
  handleShowReview
 }) => {

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
   
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isHoverStyle =  `transition-opacity duration-300  
  ${isHovered ? 'opacity-0' : 'opacity-100'}`;

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
                <button onClick={() => handleShowReview(item)} type='button' className='block m-auto mt-20'>
                  <TbListDetails className='size-12 '/>
                </button>
                <div className='absolute bottom-1 left-5'>
                  <h2 className='text-xl font-medium '>{item.name}</h2>
                  <p className='text-2xl font-medium pt-2'>{item.description}</p>
                </div>
              </div>
            </div>
            <div className={`px-5 w-full ${isHoverStyle}`}>
              <div className='h-[1px] w-full bg-Brand/80 mt-5'></div>
            </div>
            <CartBtn
              cart={cart}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateItemQuantity={updateItemQuantity}
              showIncrement={showIncrement}
              isHoverStyle={isHoverStyle}
            />
          </div>
          <p className='px-5 pb-4 pt-3 text-xl font-bold text-Darkest'>${item.price.toFixed(2)}</p>
        </div>
      </article>
    </section>
  );
};

export default StoreItem;
