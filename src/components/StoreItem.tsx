import React, { useState } from 'react';  
import { TbListDetails } from 'react-icons/tb'; 
import { ThirteenStoreData } from '../data';  
import CartBtn from './CartBtn'; 

type StoreItemProps = {
  item: ThirteenStoreData;  // The individual item to display
  showIncrement: { [key: string]: boolean };  // Track if increment/decrement buttons are shown for each item
  cart: ThirteenStoreData[];  // The current items in the cart
  addToCart: (item: ThirteenStoreData) => void;  // Function to add an item to the cart
  updateItemQuantity: (item: ThirteenStoreData) => void;  // Function to update item quantity in the cart
  removeFromCart: (item: ThirteenStoreData) => void;  // Function to remove an item from the cart
  handleShowReview: (item: ThirteenStoreData) => void;  // Function to show item reviews
  quantityBtnStyle: string;  // Additional styling for quantity button
  addToCartBtnInPreview: string;  // Styling for the "add to cart" button in preview
};

const StoreItem: React.FC<StoreItemProps> = ({
  item,
  showIncrement,
  cart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
  handleShowReview,
  quantityBtnStyle,
  addToCartBtnInPreview,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);  

  // Handle mouse enter to set hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
    
  };

  // Handle mouse leave to unset hover state
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Conditionally apply opacity based on hover state
  const isHoverStyle = `transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`;

  return (
    <article>
      <div className="relative bg-Lightest pt-1 rounded-lg"> 
        <div className="flex flex-col justify-center gap-5 items-center group">
          {/* Image wrapper with hover functionality */}
          <div
            className="cursor-pointer overflow-hidden p-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image container with responsive sizing */}
            <div
             
              className='mb-2 md:mt-10 lg:mt-2 size-[230px] md:size-[250px] lg:size-[180px]'>
              <picture>
                <source
                  srcSet={`${item.image[0]} 1200w, ${item.image[0]} 600w, ${item.image[0]} 300w`}
                  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                  type="image/webp"
                />
                <img
                  src={item.image[0]} 
                  alt={`${item.name}-image`}  
                  className="object-cover w-full h-full"  
                 
                />
              </picture>
             </div>
            {/* Hover effect content (hidden unless hovered) */}
            <div
              className={`absolute inset-0  text-Darkest 
                bg-Lightest/85 rounded-lg -z-0 transition-[.6s_ease] duration-500 
                ${isHovered ? 'w-full' : 'w-0'} overflow-hidden`}
            >
              {/* Button to show item reviews */}
              <button
                onClick={() => handleShowReview(item)}
                type="button"
                aria-label="Preview-btn"
                className="block m-auto mt-[80px] md:mt-[100px] lg:mt-[60px]"
              >
                <TbListDetails className="size-12 hover:text-Brand" />
              </button>
              <div className="absolute bottom-16 left-5 md:left-8 w-[280px] lg:w-[220px] lg:left-5">
                <h2 className={`${isHovered && "animate-textIn"} text-xl lg:text-[14px] font-medium overflow-hidden`}>
                  {item.name}
                </h2>
                <p className={`text-2xl lg:text-[15px] font-bold pt-3 lg:pt-0 leading-[1.5] 
                  ${isHovered ? "animate-textInTwo" : ''}
                `}>
                  {item.description}
                </p>
              </div>
            </div>
          </div>
          {/* Cart and action buttons (hidden while hovered) */}
          <div className={`${isHoverStyle}`}>
            <div
              className={`w-full flex flex-col items-center justify-center ${
                !showIncrement[item.id] && 'animate-fadeInBackWard'
              }`}
            >
              {/* Divider line if item has increment/decrement buttons */}
              <div
                className={`px-5 -mt-3 w-[300px] md:w-[270px] ${
                  showIncrement[item.id] && 'animate-fadeIn'
                }`}
              >
                <div className="h-[1px] w-full bg-Brand/50"></div>
              </div>
              {/* Cart button with quantity controls */}
              <div className="-mt-5 lg:-mt-[17px]">
                <CartBtn
                  cart={cart}  
                  item={item} 
                  addToCart={addToCart} // Function to add item to cart
                  removeFromCart={removeFromCart}  
                  updateItemQuantity={updateItemQuantity} 
                  showIncrement={showIncrement} 
                  quantityBtnStyle={quantityBtnStyle} 
                  addToCartBtnInPreview={addToCartBtnInPreview} 
                />
              </div>
            </div>
          </div>
        </div>
        {/* Item price */}
        <p className="relative z-10 px-5 md:px-8 pb-5 lg:pl-5  md:pt-4 text-xl md:text-lg 
          font-bold text-Brand lg:text-[15px]">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default StoreItem;
