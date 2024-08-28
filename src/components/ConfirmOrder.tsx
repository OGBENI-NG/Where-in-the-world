import React, {RefObject} from 'react';
import { ThirteenStoreData } from '../data';
import { FaApple, FaRegCreditCard, FaPaypal } from "react-icons/fa6";

type ConfirmOrderProp = {
  cart: ThirteenStoreData[];
  totalPrice: string;
  handleContinueShopping: () => void;
}

const ConfirmOrder: React.FC<ConfirmOrderProp> = ({cart, totalPrice, handleContinueShopping}) => {
  const flexDiv: string = 'flex items-center'
  const btnStyle: string = `${flexDiv}  gap-[3px] w-full justify-center py-[10px] rounded-lg `
  return (
    <section className={`${flexDiv} justify-center h-full overflow-hidden px-4`}>
      <div className=' bg-Lightest h-max w-full lg:w-[450px] text-Dark px-4 pb-5 rounded-xl'>
        <div className='text-center text-[15px] py-5 font-semibold'>
          <h1 className='text-3xl'>Your cart items</h1>
          <p>We hope you enjoy your order</p>
        </div>
        <div>
          <div className={`bg-Light/60 p-4 pt-2 rounded-lg  
            ${cart.length > 2 ? "h-[280px] overflow-y-scroll" : "h-auto"}`}>
            {cart.map(item => (
              <div key={item.id} className={`${flexDiv} gap-[12px] py-2 border-b-2 border-Mid/50`}>
                <img 
                  src={item.image[0]} 
                  alt={`${item.name}-img`} 
                  className='size-12'
                />
                <div >
                  <h2 className='text-base lg:text-[14px] w-[125px] font-bold
                   text-Dark lg:w-[190px] overflow-hidden text-ellipsis
                    whitespace-nowrap'>{item.name}</h2>
                  <p className={`${flexDiv} gap-4 text-Brand font-bold text-[14px] pt-[3px]`}>
                    X{item.quantity} <span className='text-Dark/80'>@{item.price.toFixed(2)}</span>
                  </p>
                </div>
                <p className='ml-auto text-lg font-bold text-Darkest'>
                  ${((item.quantity || 0) * item.price).toFixed(2)}
                </p>
              </div>
            ))}
            <p className={`pt-6 ${flexDiv} justify-between text-xl font-bold`}>Total price
              <span className='text-Brand'>${totalPrice}</span></p>
          </div>
        </div> 
        <div className='w-full text-xl font-bold text-Lightest'>
          <div  className={`${flexDiv} justify-between gap-4 w-full text-xl pt-4 `}>
            <button type='button' className={`${btnStyle} bg-[#FFC439] text-[#2a0d9f]`}>
              <FaPaypal className='size-7 text-Dark'/>
              Pay<span className='text-[#0C76EF] leading-none -ml-[3px]'>Pal</span>
            </button>
            <button type='button' className={`${btnStyle} bg-Darkest`}>
              <FaApple className='size-7'/>Apple
            </button>
          </div>
          <button type='button' className={`${btnStyle} bg-Darkest mt-4`}> 
            <FaRegCreditCard className='size-7 pr-1'/> Pay with debit/credit card
          </button>
          <button 
            onClick={() => handleContinueShopping()}
            type='button' 
            className={`${btnStyle} bg-Brand mt-4`}
          >Continue shopping</button>
        </div> 
      </div>
    </section>
  );
}

export default ConfirmOrder;
