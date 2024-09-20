import React from "react";
import { ThirteenStoreData } from "../data";
import { HiPlus, HiMinus} from "react-icons/hi";
import { MdAddShoppingCart } from "react-icons/md";

type CartBtnProps = {
  className?: string;   // Optional class name for custom styling
  showIncrement: { [key: string]: boolean };  // Tracks if the increment/decrement buttons are shown for an item
  addToCart: (item: ThirteenStoreData) => void;  // Function to add the item to the cart
  item: ThirteenStoreData;  // The item being rendered
  cart: ThirteenStoreData[];  // Array of items in the cart
  updateItemQuantity: (item: ThirteenStoreData) => void;  // Function to update item quantity in the cart
  removeFromCart: (item: ThirteenStoreData) => void;  // Function to remove an item from the cart
  quantityBtnStyle: string;  // Custom styles for the quantity buttons
  addToCartBtnInPreview: string;  // Custom styles for the "Add to Cart" button
}

const CartBtn: React.FC<CartBtnProps> = ({
  className = "",  // Default empty string for className if not provided
  item,  // The item passed as a prop
  cart,  // Array of cart items
  addToCart,  // Function to add the item to the cart
  showIncrement,  // Controls visibility of quantity increment buttons
  removeFromCart,  // Function to remove item from the cart
  updateItemQuantity,  // Function to update item quantity in the cart
  quantityBtnStyle,  // Custom style for quantity buttons
  addToCartBtnInPreview  // Custom style for the "Add to Cart" button
}) => {

  // Find the quantity of the current item in the cart, default to 1 if not found
  const quantity = (cart.find(cartItem => cartItem.id === item.id)?.quantity || 1);

  // Style for the increment/decrement buttons
  const btnStyle: string = `lg:hover:bg-Lightest rounded-full border-2 lg:border-[1.5px] 
  border-Lightest p-[2px] lg:hover:text-Brand`;

  return(
    <div className={`block z-20 h-[35px] w-[130px] lg:h-[] lg:w-[100px] leading-none ${className}`}>
      {/* If the item is in the cart and increment buttons should be shown */}
      {showIncrement[item.id] ? (
        <div className={`flex items-center justify-between gap-5 bg-Brand lg:gap-4
          z-50 py-[7px] px-[10px] rounded-lg text-Lightest ${quantityBtnStyle}
          w-full h-full ${showIncrement[item.id] && "animate-fadeIn" }`}>
          <button
            onClick={() => removeFromCart(item)} 
            type='button' 
            className={btnStyle}>
            <HiMinus className='size-3' /> 
          </button>
          <span className='text-[14px] font-bold size-4 pt-[2px] leading-none'>
            {quantity}
          </span>
          <button
            onClick={() => updateItemQuantity(item)} 
            type='button' 
            className={btnStyle}>
            <HiPlus className='size-3' /> 
          </button>
        </div>
      ) : (
        // If increment buttons are not shown, show the "Add to Cart" button
        <button 
          onClick={() => addToCart(item)}
          type='button' 
          className={`${addToCartBtnInPreview} flex items-center justify-center 
            gap-[3px] w-full h-full lg:px-2 lg:gap-[3px]  leading-none
            text-[14px] font-semibold overflow-x-hidden lg:text-[12px]
            border-[1.5px] border-Brand/50 bg-Lightest py-1 px-4 rounded-lg
            lg:hover:text-Brand lg:hover:border-Brand transition-colors duration-200`}>
          <MdAddShoppingCart className='size-[20px] lg:size-[15px] text-Brand'/> 
          Add to cart
        </button>
      )}
    </div>
  )      
} 

export default CartBtn;
