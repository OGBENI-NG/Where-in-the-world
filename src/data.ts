import bedOne from './assets/img/bed-one.png';
import bedTwo from './assets/img/bed-two.png';
import bedThree from './assets/img/bed-three.png';
import tableOne from './assets/img/table-one.png';
import tableTwo from './assets/img/table-four.png';
import tableThree from './assets/img/table-three.png';
import chairOne from './assets/img/chair-one.png';
import chairTwo from './assets/img/chair-two.png';
import chairThree from './assets/img/chair-three.png';
import shelveOne from './assets/img/shelves-one.png';
import shelveTwo from './assets/img/shelves-two.png';
import shelveThree from './assets/img/shelves-three.png';
import altImgOne from './assets/img/alt-one.png';
import altImgTwo from './assets/img/alt-two.png';

export type ThirteenStoreData = {
  id: number;
  name: string;
  image: [] | string[];
  price: number;
  description: string;
  category: string;
  details: string;
  quantity?: number;
  rating: number;
  numberOfRating: number
};

export const storeData: ThirteenStoreData[] = [
  {
    id: 5,  
    rating: 4,
    numberOfRating: 1222,
    name: 'Bed-two',
    image: [bedTwo, altImgOne, altImgTwo],
    price: 550.00,
    description: 'Luxurious king-size bed.',
    details: 'Experience the luxury and spaciousness of a king-size bed.',
    category: 'bed',
  },
  {
    id: 1,  
    rating: 4,
    numberOfRating: 672,
    name: 'Chair-one',
    image: [chairOne, altImgOne, altImgTwo],
    price: 98.80,
    description: 'Creative designer chair.',
    details: 'Lorem Ipsum is simply the dummy text for print shops and text files.',
    category: 'chair',
  },
  {
    id: 7,  
    rating: 5,
    numberOfRating: 850,
    name: 'Table-one',
    image: [tableOne, altImgOne, altImgTwo],
    price: 220.00,
    description: 'Modern dining table.',
    details: 'A dining table that adds a modern touch to your dining room.',
    category: 'table',
  },
  {
    id: 4,  
    rating: 3,
    numberOfRating: 432,
    name: 'Bed-one',
    image: [bedOne, altImgOne, altImgTwo],
    price: 450.00,
    description: 'Cozy and comfortable bed.',
    details: 'This bed provides the ultimate comfort and support.',
    category: 'bed',
  },
  {
    id: 11,  
    rating: 4,
    numberOfRating: 378,
    name: 'Shelve-two',
    image: [shelveTwo, altImgOne, altImgTwo],
    price: 89.99,
    description: 'Modern metal shelves.',
    details: 'Modern metal shelves for a sleek and organized space.',
    category: 'shelve',
  },
  {
    id: 3,  
    rating: 3,
    numberOfRating: 122,
    name: 'Chair-three',
    image: [chairThree, altImgOne, altImgTwo],
    price: 85.00,
    description: 'Modern chair for minimalist designs.',
    details: 'A modern chair that fits perfectly in any minimalist design.',
    category: 'chair',
  },
  {
    id: 2,  
    rating: 5,
    numberOfRating: 879,
    name: 'Chair-two',
    image: [chairTwo, altImgOne, altImgTwo],
    price: 120.50,
    description: 'Elegant and comfortable chair.',
    details: 'This chair offers comfort and elegance for your living space.',
    category: 'chair',
  },
  {
    id: 12,  
    rating: 4,
    numberOfRating: 642,
    name: 'Shelve-three',
    image: [shelveThree, altImgOne, altImgTwo],
    price: 120.00,
    description: 'Versatile shelving unit.',
    details: 'A versatile shelving unit that fits any room.',
    category: 'shelve',
  },
  {
    id: 10,  
    rating: 3,
    numberOfRating: 782,
    name: 'Shelve-one',
    image: [shelveOne, altImgOne, altImgTwo],
    price: 99.99,
    description: 'Sturdy wooden shelves.',
    details: 'Durable wooden shelves for storage and display.',
    category: 'shelve',
  },
  {
    id: 8,  
    rating: 5,
    numberOfRating: 532,
    name: 'Table-two',
    image: [tableTwo, altImgOne, altImgTwo],
    price: 300.00,
    description: 'Elegant wooden table.',
    details: 'This wooden table brings elegance to any dining area.',
    category: 'table',
  },
  {
    id: 6,  
    rating: 5,
    numberOfRating: 652,
    name: 'Bed-three',
    image: [bedThree, altImgOne, altImgTwo],
    price: 380.00,
    description: 'Affordable bed with style.',
    details: 'A stylish bed that is also budget-friendly.',
    category: 'bed',
  },
  {
    id: 9,  
    rating: 3,
    numberOfRating: 762,
    name: 'Table-three',
    image: [tableThree, altImgOne, altImgTwo],
    price: 175.00,
    description: 'Compact table for small spaces.',
    details: 'A compact table perfect for small living spaces.',
    category: 'table',
  },
];
