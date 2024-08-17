import React from 'react';
import { ThirteenStoreData } from '../data';
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin2Line } from "react-icons/ri";

type CartProps = {
  cart: ThirteenStoreData[];
  totalPrice: string;
  removeFromCart: (item: ThirteenStoreData) => void;
  toggleCart: boolean;
  isRemoving: { [key: string]: boolean }
};

const Cart: React.FC<CartProps> = ({ cart, totalPrice, isRemoving, removeFromCart }) => {
  return (
    <div className={``}>
      {cart.length === 0 ? (
        <div className={`bg-Lightest px-5 text-Mid/85 
          h-[310px] w-full z-50 shadow-xl shadow-Mid/50 
          rounded-lg flex flex-col items-center justify-center
          gap-5 text-xl font-bold text-[14px] py-4`}>
          <h3 className='border-b-2 w-full text-center pb-6'>Cart</h3>
          <GiShoppingCart className='size-28'/>
          <p className='pt-4'>Your Cart Is Empty</p>
        </div>
      ) : (
        <div className="w-full bg-Lightest shadow-xl shadow-Mid/50 p-5 py-4 rounded-lg overflow-x-hidden">
          {cart.map((item) => (
            <div key={item.id} 
              className={`${isRemoving[item.id] && "animate-slideOut"}`} >
              <div className='flex items-center py-2  border-b-2 border-Mid/25'>
                <img 
                  src={item.image[0]} 
                  alt={item.name} 
                  className="size-[65px]"
                />
                <div className='pl-[10px] text-[14px] font-semibold text-Mid'>
                  <h3 className="text-lg font-bold text-Dark">{item.name}</h3>
                  <div className='flex items-center gap-3'>
                    <p className='font-bold text-Brand'>X{item.quantity}</p>
                    <p>@{item.price.toFixed(2)}</p>
                    <p >${((item.quantity || 1) * item.price).toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  type='button' 
                  onClick={() => removeFromCart(item)} 
                  className=" ml-auto text-Dark/80"
                >
                  <RiDeleteBin2Line className='size-7'/>
                </button>
              </div>
            </div>
          ))}
          <h4 className='flex items-center py-6 pb-6 text-xl font-bold text-Dark'>Order Total <span className='ml-auto'>${totalPrice}</span></h4>
          <button className='bg-Brand w-full text-Lightest py-2 text-xl rounded-lg font-bold'>Confirm Order</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
