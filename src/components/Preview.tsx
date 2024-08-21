import React,{useState} from 'react';
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

const Preview: React.FC<ReviewProps> = ({item, onBack, className, showIncrement, addToCart,
  cart, updateItemQuantity, removeFromCart, quantityBtnStyle = ""
}) => {

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const imgThumbnail = item.image.map((img, index) => (
    <div 
      key={index} 
      className={`cursor-pointer relative size-[80px] border-2 border-Brand/15
        ${currentIndex === index && `before:absolute before:content-[""] before:bg-Brand/15 before:inset-0 before:border-2 before:border-Brand before:rounded-lg 
        before:transition-colors before:duration-500`}  
        overflow-x-hidden rounded-lg p-2`}
      onClick={() => setCurrentIndex(index)}
    >
      <img 
        className='object-cover h-full w-full bg-Lightest/20' 
        src={img} 
        alt={`${item.name}-thumbnail-${index}`} 
      />
    </div>
  ))

  // Generate stars based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className=''>
      {index < item.rating ? (
        <PiStarFill className="text-amber-500 size-6" /> // Filled star
      ) : (
        <PiStarFill className="text-Mid/50 size-6" /> // Outlined star
      )}
    </span>
  ));

  return (
    <article >
      <div className='px-5'>
        <button 
          onClick={onBack} 
          type='button' 
          className='flex items-center text-lg gap-[2px] text-Dark/65 hover:text-Dark 
            font-semibold mb-4'
        >
          <IoArrowBack />Back to store
        </button>
      </div>
      <section className='bg-Lightest/60 rounded-b-[50px] border-b-[2px]
        border-Brand overflow-x-hidden p-5'>
        <div className='size-[220px] m-auto pb-5'>
          <img 
            src={item.image[currentIndex]} 
            alt={`${item.name}-image`} 
            className='w-full h-full '
          />
        </div>
        <div className='flex items-center justify-center gap-4 py-4 border-t-2 border-t-Brand/15'>
          {imgThumbnail}
        </div>
      </section> 
      <section className='px-5 bg-Lightest/60 rounded-t-[50px] border-t-[2px]
        border-Brand overflow-x-hidden py-10 -mt-5'>
        <h2 className='text-3xl font-bold text-Dark'>{item.name}</h2>
        <h3 className='text-Brand font-semibold text-2xl py-2'>${item.price.toFixed(2)}</h3>
        <p className='flex items-center gap-1 pt-1'>
          {stars} / {item.numberOfRating} 
          <span>ratings</span>
        </p>
        <p className='text-2xl pt-5'>{item.details}</p>
        <CartBtn
          cart={cart}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          updateItemQuantity={updateItemQuantity}
          showIncrement={showIncrement}
          className="w-full mt-6 h-11"
          isHoverStyle=''
          quantityBtnStyle='px-[18px]'
        />
      </section>
    </article>
  );
}

export default Preview;
