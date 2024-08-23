import React, { useState } from 'react';
import { ThirteenStoreData } from '../data';
import { IoArrowBack } from "react-icons/io5";
import { PiStarFill } from "react-icons/pi";
import CartBtn from './CartBtn';

type ReviewProps = {
  item: ThirteenStoreData; 
  onBack: () => void;
  className: "";
  showIncrement: { [key: string]: boolean };
  addToCart: (item: ThirteenStoreData) => void;
  cart: ThirteenStoreData[];  
  updateItemQuantity: (item: ThirteenStoreData) => void; 
  removeFromCart: (item: ThirteenStoreData) => void; 
  quantityBtnStyle: ""
}

const Preview: React.FC<ReviewProps> = ({ item, onBack, showIncrement, addToCart, cart, updateItemQuantity, removeFromCart }) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const transitionDuration: number = 250; // Duration of the fade-out effect and border transition in milliseconds

  const handleThumbnailClick = (index: number) => {
    if (index !== currentIndex) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsFading(false);
      }, transitionDuration);
    }
  };

  const imgThumbnail = item.image.map((img, index) => (
    <div 
      key={index} 
      className={`cursor-pointer relative size-[80px] border-2 border-Brand/15
        ${currentIndex === index ? `
          before:absolute before:content-[""] before:bg-Brand/15 before:inset-0 
          before:border-2 before:border-Brand before:rounded-[6px] 
          before:transition-all before:duration-${transitionDuration} 
          before:delay-${transitionDuration}` : ''}
        overflow-x-hidden rounded-lg p-2`}
      onClick={() => handleThumbnailClick(index)}
    >
      <img 
        className='object-cover h-full w-full bg-Lightest/20' 
        src={img} 
        alt={`${item.name}-thumbnail-${index}`} 
      />
    </div>
  ));

  // Generate stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      {index < item.rating ? (
        <PiStarFill className="text-amber-500 size-[20px]" /> // Filled star
      ) : (
        <PiStarFill className="text-Mid/50 size-[20px]" /> // Outlined star
      )}
    </span>
  ));

  return (
    <article className='h-auto'>
      <div className='px-5 pt-12'>
        <button 
          onClick={onBack} 
          type='button' 
          className='flex items-center text-lg gap-[2px] text-Dark/65 hover:text-Dark 
            font-semibold mb-4 leading-none'
        >
          <IoArrowBack />Back to store
        </button>
      </div>
      <div className='md:grid md:grid-cols-2'>
        <section className='bg-Lightest rounded-b-[20px] border-b-[1px]
          border-Brand/60 overflow-x-hidden p-5 py-8 md:rounded-r-[20px] md:border-r-[1px]'>
          <div className={`size-[220px] m-auto pb-5 transition-opacity duration-${transitionDuration} 
            ${isFading ? "opacity-0" : "opacity-100"}`}>
            <img 
              src={item.image[currentIndex]} 
              alt={`${item.name}-image`} 
              className='w-full h-full '
            />
          </div>
          <div className='flex items-center justify-center gap-4 pt-5 '>
            {imgThumbnail}
          </div>
        </section> 
        <section className='px-5 bg-Lightest rounded-t-[20px] border-t-[1px]
          border-Brand/60 overflow-x-hidden py-10 -mt-[1px]  md:rounded-t-[20px] 
            md:border-l-[1px]'>
          <h2 className='text-2xl font-bold text-Dark'>{item.name}</h2>
          <h3 className='text-Brand font-semibold text-2xl py-2'>${item.price.toFixed(2)}</h3>
          <p className='flex items-center gap-1 pt-1 text-[14px] text-Mid font-bold'>
            {stars} <span className='text-xl px-1'> / </span> {item.numberOfRating} 
            <span>ratings</span>
          </p>
          <p className='text-2xl py-4'>{item.details}</p>
          <CartBtn
            cart={cart}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            updateItemQuantity={updateItemQuantity}
            showIncrement={showIncrement}
            className="w-full mt-6 h-[50px]"
            quantityBtnStyle='px-[15px]'
            addToCartBtnInPreview='text-lg'
          />
        </section>
      </div>
    </article>
  );
}

export default Preview;
