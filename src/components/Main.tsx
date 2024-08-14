import React from 'react';
import { ThreeStoreData } from '../data';

type Props = {
  item: ThreeStoreData; // Use lowercase 'string' for the type
};

// Correct the syntax for React.FC and function declaration
const Main: React.FC<Props> = ({ item }) => {
  return (
    <main className='transition-[0.3s ease, width 0.3s ease]'>
      <article>
        <div>
          <img src={item.image[0]} alt={`${item.name}-image`} />
        </div>
      </article>
    </main>
  );
};

export default Main;
