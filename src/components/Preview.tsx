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
      className={`cursor-pointer relative size-[80px] md:size-[100px] border-2 border-Brand/15
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
    <article className='h-auto px-5 md:px-10 lg:px-12 xl:px-14'>
      <div className='py-24 pt-20'>
        <button 
          onClick={onBack}
           
          type='button' 
          className='flex items-center text-lg gap-[2px] text-Dark/65 hover:text-Dark 
            font-semibold leading-none mb-5'
        >
          <IoArrowBack />Back to store
        </button>
        <div className='md:grid md:grid-cols-2 '>
          <section className='flex flex-col justify-center items-center
             bg-Lightest rounded-b-[20px] border-b-[1px]
            border-Brand/60 overflow-x-hidden p-5 py-6 md:rounded-none 
            md:rounded-e-[30px] md:border-r-[1px] md:border-b-0 md:p-6 md:py-9
            lg:p-14'>
            <div className={`size-[230px]  md:size-[250px] lg:size-[300px]
             mb-6 mt-5 md:mt-4 lg:m-0 transition-opacity duration-${transitionDuration} overflow-hidden 
              ${isFading ? "opacity-0" : "opacity-100"}`}>
              <img 
                src={item.image[currentIndex]} 
                alt={`${item.name}-image`} 
                className='w-full h-full object-cover'
              />
            </div>
            <div className='flex items-center justify-between w-full mt-auto lg:justify-center lg:gap-6 lg:pt-4'>
              {imgThumbnail}
            </div>
          </section> 
          <section className='flex flex-col gap-4 p-5 py-6 md:p-6 md:py-9
            bg-Lightest  rounded-t-[20px] border-t-[1px] lg:p-14 lg:pt-24
            border-Brand/60 -mt-[1px] md:-ml-[1px] md:rounded-none lg:gap-8
            md:border-l-[1px] md:border-t-0 md:rounded-s-[30px] overflow-x-hidden'
          >
            <h2 className='text-2xl md:text-[28px] font-bold text-Dark md:pt-8 lg:p-0'>{item.name}</h2>
            <h3 className='text-Brand font-bold text-2xl md:text-[28px] md:pt-2 lg:pt-0'>
              ${item.price.toFixed(2)}
            </h3>
            <p className='flex items-center gap-1 text-[14px] text-Mid font-bold md:pt-3 lg:p-0'>
              {stars} <span className='text-xl px-1'> / </span> {item.numberOfRating} 
              <span>ratings</span>
            </p>
            <p className='text-2xl md:text-[28px] leading-9 md:pt-4 lg:p-0'>{item.details}</p>
            <CartBtn
              cart={cart}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              updateItemQuantity={updateItemQuantity}
              showIncrement={showIncrement}
              className="w-full mt-5 md:mt-auto h-[50px] lg:w-[200px] lg:h-[45px]"
              quantityBtnStyle='px-[15px] lg:px-[12px]'
              addToCartBtnInPreview='text-lg'
            />
          </section>
        </div>
      </div>
    </article>
  );
}

export default Preview;
