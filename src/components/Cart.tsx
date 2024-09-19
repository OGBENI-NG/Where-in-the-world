import React from 'react';
import { ThirteenStoreData } from '../data';
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";

type CartProps = {
  cart: ThirteenStoreData[];  // Array of cart items with their data
  totalPrice: string;         // Total price of items in the cart, formatted as a string
  removeFromCart: (item: ThirteenStoreData) => void;  // Function to remove an item from the cart
  toggleCart: boolean;        // State to toggle the visibility of the cart
  isRemoving: { [key: string]: boolean };  // Object to track if an item is currently being removed (used for animations)
  handleConfirmOrder: () => void;  // Function to confirm the order
};

const Cart: React.FC<CartProps> = (
  { 
    cart,         // Cart items passed in as props
    totalPrice,   // The total price of items in the cart
    isRemoving,   // Tracks which items are being removed
    removeFromCart,  // Function to remove a cart item
    handleConfirmOrder  // Function to confirm the order
  }
) => {
  return (
    <div className={``}> 
      {cart.length === 0 ? (  
        // If the cart is empty, show this message
        <div className={`bg-Lightest px-5 text-Mid/85 h-max w-full z-50 shadow-xl shadow-Mid/50 rounded-lg
         text-center flex flex-col items-center gap-y-4 text-xl font-bold text-[14px]`}>
          <h3 className='border-b-2 w-full py-4'>Cart</h3> 
          <GiShoppingCart className='size-28 m-auto'/> 
          <p className='py-4'>Your Cart Is Empty</p> 
        </div>
      ) : (
        // If there are items in the cart, show the cart details
        <div className="w-full bg-Lightest shadow-xl lg:shadow-2xl shadow-Mid/50 p-5 pb-6  rounded-lg overflow-hidden md:p-8 lg:p-[25px]">
          <h4 className="text-center text-2xl lg:text-lg font-semibold leading-none pb-3 text-Dark">Your Cart Item</h4> 

          {/* List of cart items with a scrollable container if there are many items */}
          <div className={`overflow-hidden rounded-lg ${cart.length > 3 ? "h-[280px] lg:h-[205px] overflow-y-auto" : "h-auto"}`}>
            {cart.map((item) => (
              <div key={item.id} className={`${isRemoving[item.id] && "animate-slideOut"}`}> 
                <div className={`flex items-center py-2 border-b-2 border-dotted border-Mid/60`}>
                  <img 
                    src={item.image[0]} 
                    alt={item.name} 
                    className="size-[65px] lg:size-[50px]"
                  />
                  <div className='pl-[10px] text-[14px] font-semibold'>
                    <h3 className="text-[15px] tracking-wide lg:text-[14px] w-[180px] 
                    font-bold text-DarK overflow-hidden text-ellipsis whitespace-nowrap
                     text-Dark">{item.name}</h3>
                    {/* Item quantity, unit price, and total price */}
                    <div className='flex items-center gap-3 text-[12px] pt-[2px] text-Mid'>
                      <p className='font-bold text-Brand'>X{item.quantity}</p>  
                      <p>@{item.price.toFixed(2)}</p>  {/* Unit price */}
                      <p>${((item.quantity || 1) * item.price).toFixed(2)}</p> 
                    </div>
                  </div>
                  <button 
                    type='button' 
                    onClick={() => removeFromCart(item)} 
                    className="ml-auto text-Dark/80 lg:hover:text-Brand"
                  >
                    <RiDeleteBin2Line className='size-7 lg:size-5'/>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4 className='flex items-center pt-5 pb-7 lg:py-4 text-lg lg:text-[14px] font-bold text-Dark'>
            Order Total <span className='ml-auto text-Brand'>${totalPrice}</span>
          </h4>
          <button 
            onClick={() => handleConfirmOrder() }
            type='button' 
            className='bg-Brand shadow-lg shadow-Brand/35 w-full text-Lightest py-2 text-base 
              rounded-lg font-bold lg:text-[14px] lg:py-1'>
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

