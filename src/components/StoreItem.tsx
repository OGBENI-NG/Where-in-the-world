import React, { useState } from 'react';
import { TbListDetails } from 'react-icons/tb';
import { ThirteenStoreData } from '../data';
import CartBtn from './CartBtn';

type StoreItemProps = {
  item: ThirteenStoreData;
  showIncrement: { [key: string]: boolean }; // Object to track which items have the increment/decrement buttons displayed
  cart: ThirteenStoreData[]; // Array of items in the cart
  addToCart: (item: ThirteenStoreData) => void; // Function to add item to the cart
  updateItemQuantity: (item: ThirteenStoreData) => void; // Function to increase the item quantity in the cart
  removeFromCart: (item: ThirteenStoreData) => void; // Function to decrease the item quantity in the cart
  handleShowReview: (item: ThirteenStoreData) => void; // Function to show reviews
  quantityBtnStyle: string; // Additional styling for the quantity button
  addToCartBtnInPreview: string; // Styling for add to cart button in preview
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isHoverStyle = `transition-opacity duration-300 ${
    isHovered ? 'opacity-0' : 'opacity-100'
  }`;

  return (
    <article>
      <div className="relative bg-Lightest pt-1 rounded-lg">
        <div className="flex flex-col justify-center gap-5 items-center group">
          <div
            className="cursor-pointer overflow-hidden p-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='mb-2 md:mt-10 lg:mt-2 size-[230px] md:size-[250px] 
              lg:size-[180px]'
            >
              <picture>
                <source
                  srcSet={`${item.image[0]} 1200w, ${item.image[0]} 600w, ${item.image[0]} 300w`}
                  sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                  type="image/webp"
                />
                <img
                  src={item.image[0]} // Fallback to the smallest image
                  alt={`${item.name}-image`}
                  className="object-cover w-full h-full"
                />
              </picture>
             </div>
            <div
              className={`absolute top-0 left-0 right-0 bottom-[85px] w-full
                text-Darkest bg-Lightest/85 rounded-t-lg -z-0 transition-opacity duration-300
                ${isHovered ? 'opacity-100' : 'opacity-0'} overflow-x-hidden`}
            >
              <button
                onClick={() => handleShowReview(item)}
                type="button"
                aria-label="Preview-btn"
                className="block m-auto mt-[60px] md:mt-[100px] lg:mt-[60px]"
              >
                <TbListDetails className="size-12 hover:text-Brand" />
              </button>
              <div className="absolute bottom-1 left-5 md:left-8 w-[280px] lg:w-[220px] lg:left-5">
                <h2 className="text-xl lg:text-[14px] font-medium overflow-hidden">
                  {item.name}
                </h2>
                <p className="text-2xl lg:text-[18px] font-bold pt-3 lg:pt-0 leading-[1.5]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
          <div className={`${isHoverStyle}`}>
            <div
              className={`w-full flex flex-col items-center justify-center ${
                !showIncrement[item.id] && 'animate-fadeInBackWard'
              }`}
            >
              <div
                className={`px-5 -mt-3 w-[300px] md:w-[270px] ${
                  showIncrement[item.id] && 'animate-fadeIn'
                }`}
              >
                <div className="h-[1px] w-full bg-Brand/50"></div>
              </div>
              <div className="-mt-5 lg:-mt-[17px]">
                <CartBtn
                  cart={cart}
                  item={item}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  updateItemQuantity={updateItemQuantity}
                  showIncrement={showIncrement}
                  quantityBtnStyle={quantityBtnStyle} // Use the passed prop for styling
                  addToCartBtnInPreview={addToCartBtnInPreview} // Use the passed prop for button styling
                />
              </div>
            </div>
          </div>
        </div>
        <p
          className="px-5 md:px-8 pb-5 lg:pl-5 pt-1 md:pt-4 text-xl md:text-2xl 
          font-bold text-Brand lg:text-xl"
        >
          ${item.price.toFixed(2)}
        </p>
      </div>
    </article>
  );
};

export default StoreItem;
