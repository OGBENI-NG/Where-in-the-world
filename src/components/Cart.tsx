import React from 'react';
import { ThirteenStoreData } from '../data';
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";

type CartProps = {
  cart: ThirteenStoreData[];
  totalPrice: string;
  removeFromCart: (item: ThirteenStoreData) => void;
  toggleCart: boolean;
  isRemoving: { [key: string]: boolean };
  handleConfirmOrder: () => void
};

const Cart: React.FC<CartProps> = (
  { 
    cart, 
    totalPrice, 
    isRemoving, 
    removeFromCart, 
    handleConfirmOrder
  }
) => {
  return (
    <div className={``}>
      {cart.length === 0 ? (
        <div className={` bg-Lightest px-5 text-Mid/85 
          h-max w-full z-50 shadow-xl shadow-Mid/50 
          rounded-lg text-center flex flex-col items-center
          gap-y-4 text-xl font-bold text-[14px]`}>
          <h3 className='border-b-2 w-full py-4'>Cart</h3>
          <GiShoppingCart className='size-28 m-auto'/>
          <p className='py-4'>Your Cart Is Empty</p>
        </div>
      ) : (
        <div className="w-full bg-Lightest shadow-xl lg:shadow-2xl shadow-Mid/50 p-5 pb-6  rounded-lg overflow-x-hidden md:p-8 lg:p-[25px]">
          <h4 className="text-center text-3xl lg:text-lg font-semibold leading-none pb-3 text-Dark">Your Cart Item</h4>
          {cart.map((item) => (
            <div key={item.id} 
              className={`${isRemoving[item.id] && "animate-slideOut"}`} >
              <div className='flex items-center py-2  border-b-2 border-Mid/25'>
                <img 
                  src={item.image[0]} 
                  alt={item.name} 
                  className="size-[65px] lg:size-[50px]"
                />
                <div className='pl-[10px] text-[14px] font-semibold text-Mid'>
                  <h3 className="text-lg lg:text-[14px] w-[180px] font-bold text-Dark 
                  lg:w-[190px] 
                  overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</h3>
                  <div className='flex items-center gap-3 text-[13px] pt-[1px]'>
                    <p className='font-bold text-Brand'>X{item.quantity}</p>
                    <p>@{item.price.toFixed(2)}</p>
                    <p >${((item.quantity || 1) * item.price).toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  type='button' 
                  onClick={() => removeFromCart(item)} 
                  className=" ml-auto text-Dark/80 lg:hover:text-Brand"
                >
                  <RiDeleteBin2Line className='size-7 lg:size-5'/>
                </button>
              </div>
            </div>
          ))}
          <h4 className='flex items-center py-6 lg:py-4 text-xl lg:text-[14px] font-bold text-Dark'>Order Total <span className='ml-auto'>${totalPrice}</span></h4>
          <button 
            onClick={() => handleConfirmOrder() }
            type='button' 
            className='bg-Brand w-full text-Lightest py-2 text-xl rounded-lg font-bold lg:text-[14px] lg:py-1'>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
