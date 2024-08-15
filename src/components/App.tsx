import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { useTheme } from '../Hook/ThemeContext';
import Header from './Header';
import StoreItem from './StoreItem';
import { storeData, ThreeStoreData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up
import CategoryList from './CategoryList';

const App: React.FC = () => {
  const { theme, setTheme, toggle, handleToggle } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  // State to store items in the cart
  const [cart, setCart] = useState<ThreeStoreData[]>([]);
  // State to show increment button for each item
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  //state to add animation to remove item from cart
  const [isRemoving, setIsRemoving] = useState<{[key: string]: boolean}>({});

  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];
  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);
  // Calculate total quantity of items in the cart
  const totalCartItem = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  useEffect(() => {
    const activeIndex = categories.findIndex(
      (category) => category.toLowerCase() === selectedCategory.toLowerCase()
    );
    const activeElement = categoryRefs.current[activeIndex];
    if (activeElement) {
      const left = activeElement.offsetLeft;
      const width = activeElement.offsetWidth;
      // Set the custom CSS properties for underline
      document.documentElement.style.setProperty('--underline-left', `${left}px`);
      document.documentElement.style.setProperty('--underline-width', `${width}px`);
    }
  }, [selectedCategory, categories]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredStoreData = React.useMemo(() => {
    return selectedCategory === 'All Category'
      ? storeData
      : storeData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  // Function to add item to the cart
  function addToCart(item: ThreeStoreData) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item);
    } else {
      setCart([{ ...item, quantity: 1 }, ...cart]);
      setShowIncrement({ ...showIncrement, [item.id]: true });
    }
  }

  // Function to update item quantity in the cart
  function updateItemQuantity(item: ThreeStoreData) {
    setCart(
      cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
  }

   // Function to remove or decrement item quantity in the cart
   function removeItemQuantity(item: ThreeStoreData) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const newQuantity = (existingItem.quantity || 1) - 1;
      if (newQuantity > 0) {
        setCart(
          cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
      } else {
        setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
        setShowIncrement({ ...showIncrement, [item.id]: false });
        setTimeout(() => {
          setCart(cart.filter(cartItem => cartItem.id !== item.id));
          setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
        }, 300);
      }
    }
  }

  return (
    <div className="bg-Light h-screen font-Nunito px-5 overflow-x-auto">
      <Header 
        totalCartItem={totalCartItem}
      />
      <main>
        <CategoryList
          categories={categories}
          categoryRefs={categoryRefs}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <div className='my-8'>
          {filteredStoreData.map((item) => (
            <StoreItem 
              key={item.id} 
              item={item} 
              showIncrement={showIncrement}
              cart={cart}
              addToCart={addToCart}
              updateItemQuantity={updateItemQuantity}
              removeFromCart={removeItemQuantity}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
