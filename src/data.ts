import bedOne from './assets/img/webp/bed-one.webp';
import bedTwo from './assets/img/webp/bed-two.webp';
import bedThree from './assets/img/webp/bed-three.webp';
import tableOne from './assets/img/webp/table-one.webp';
import tableTwo from './assets/img/webp/table-four.webp';
import tableThree from './assets/img/webp/table-three.webp';
import chairOne from './assets/img/webp/chair-one.webp';
import chairTwo from './assets/img/webp/chair-two.webp';
import chairThree from './assets/img/webp/chair-three.webp';
import shelveOne from './assets/img/webp/shelves-one.webp';
import shelveTwo from './assets/img/webp/shelves-two.webp';
import shelveThree from './assets/img/webp/shelves-three.webp';
import altImgOne from './assets/img/webp/alt-one.webp';
import altImgTwo from './assets/img/webp/alt-two.webp';

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
  numberOfRating: number;
};

export const storeData: ThirteenStoreData[] = [
  {
    id: 5,  
    rating: 4,
    numberOfRating: 1222,
    name: 'Deluxe King Bed',
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
    name: 'Modern Designer Chair',
    image: [chairOne, altImgOne, altImgTwo],
    price: 98.80,
    description: 'Creative designer chair.',
    details: 'This wooden table brings elegance to any dining area. This wooden table brings elegance to any dining area. ',
    category: 'chair',
  },
  {
    id: 7,  
    rating: 5,
    numberOfRating: 850,
    name: 'Contemporary Dining Table',
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
    name: 'Cozy Comfort Bed',
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
    name: 'Sleek Metal Shelves',
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
    name: 'Minimalist Modern Chair',
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
    name: 'Elegant Comfort Chair',
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
    name: 'Versatile Shelving Unit',
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
    name: 'Sturdy Wooden Shelves',
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
    name: 'Elegant Wooden Table',
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
    name: 'Stylish Budget Bed',
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
    name: 'Compact Space-Saver Table',
    image: [tableThree, altImgOne, altImgTwo],
    price: 175.00,
    description: 'Compact table for small spaces.',
    details: 'A compact table perfect for small living spaces.',
    category: 'table',
  },
];
