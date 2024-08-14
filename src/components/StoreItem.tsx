import React from 'react';
import { MdAddShoppingCart } from "react-icons/md";
import { ThreeStoreData } from '../data';

type StoreItemProps = {
  item: ThreeStoreData; // Use lowercase 'string' for the type

};

// Correct the syntax for React.FC and function declaration
const StoreItem: React.FC<StoreItemProps> = ({ item }) => {
  return (
    <section>
      <article>
        <div className='bg-Lightest mt-3 pt-4 rounded-lg'>
          <div className='flex flex-col justify-center items-center'>
            <div className='size-[200px] '>
              <img 
                src={item.image[0]} 
                alt={`${item.name}-image`}  
                className='h-full w-full object-cover'
              />
              </div>
              {/* button line */}
              <div className='px-5 w-full'>
                <div className='h-[1.5px] w-full bg-Brand mt-8'></div>
              </div>
              <div className='-mt-5'>
                <div className='relative '>
                  <button className='flex items-center gap-1 text-base font-semibold 
                    border-[1.5px] border-Brand bg-Lightest py-1 px-4 rounded-lg '>
                    <MdAddShoppingCart className='size-[20px] text-Brand'/> 
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
              <p className=' px-5 pb-4 pt-2 text-xl font-bold text-Dark'>${item.price.toFixed(2)}</p>
          </div>
       </article>
    </section>
  );
};
export default StoreItem;
