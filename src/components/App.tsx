import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import StoreItem from './StoreItem';
import { storeData, ThirteenStoreData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up
import CategoryList from './CategoryList';
import Cart from './Cart';
import Footer from './Footer';
import Preview from './Preview';
import ConfirmOrder from './ConfirmOrder';
import TruckLoader from './TruckLoader';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [cart, setCart] = useState<ThirteenStoreData[]>([]);
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  const [isRemoving, setIsRemoving] = useState<{ [key: string]: boolean }>({});
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [toggleConfirmOrder, setToggleConfirmOrder] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [truckLoading, setTruckLoading] = useState<boolean>(false);

  const [selectedItemForReview, setSelectedItemForReview] = useState<ThirteenStoreData | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0); // Save scroll position
  
  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);
  const totalItemInCartQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleToggleCart = () => {
    setToggleCart(prevState => !prevState);
  };

  const handleConfirmOrder = () => {
    setTruckLoading(true);
    setToggleConfirmOrder(true); // Open ConfirmOrder when this function is called
    setToggleCart(false);
    setTimeout(() => {
      setTruckLoading(false);
    }, 3000);
  };

  const handleContinueShopping = () => {
    setToggleConfirmOrder(false);
  };

  useEffect(() => {
    const handleClickOutsideCartModal = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setToggleCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideCartModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCartModal);
    };
  }, [cartRef, toggleCart]);

  useEffect(() => {
    const PADDING = 8; // Adjust the padding as needed

    const activeIndex = categories.findIndex(
      (category) => category.toLowerCase() === selectedCategory.toLowerCase()
    );
    const activeElement = categoryRefs.current[activeIndex];
    if (activeElement) {
      const left = activeElement.offsetLeft - PADDING;
      const width = activeElement.offsetWidth + PADDING * 2;

      document.documentElement.style.setProperty('--underline-left', `${left}px`);
      document.documentElement.style.setProperty('--underline-width', `${width}px`);
    }
  }, [selectedCategory, categories]);

  const handleCategoryClick = (category: string) => {
    setIsFadingOut(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsFadingOut(true);
    }, 250);
  };

  const filteredStoreData = React.useMemo(() => {
    return selectedCategory === 'All Category'
      ? storeData
      : storeData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  function addToCart(item: ThirteenStoreData) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item);
    } else {
      setCart([{ ...item, quantity: 1 }, ...cart]);
      setShowIncrement({ ...showIncrement, [item.id]: true });
    }
    setToggleCart(false);
  }

  function updateItemQuantity(item: ThirteenStoreData) {
    setCart(
      cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
    setToggleCart(false);
  }

  function removeItemQuantity(item: ThirteenStoreData) {
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
        setToggleCart(false);
        setShowIncrement({ ...showIncrement, [item.id]: false });
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
      }
    }
  }

  function removeItemFromCart(item: ThirteenStoreData) {
    setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setShowIncrement({ ...showIncrement, [item.id]: false });
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
      setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
    }, 250);
  }

  function handleShowReview(item: ThirteenStoreData) {
    // Save the current scroll position before showing the preview
    setScrollPosition(window.scrollY);
    setSelectedItemForReview(item);
    // Scroll to the top when showing the preview
    window.scrollTo(0, 0);
  }

  function handleBackFromReview() {
    setSelectedItemForReview(null);
    // Restore the previous scroll position when going back
    window.scrollTo(0, scrollPosition);
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    // Ensure only the overlay click closes the modal, not the ConfirmOrder
    if (e.target === e.currentTarget) {
      setToggleConfirmOrder(false);
    }
  };

  return (
    <div className={`bg-Light font-Nunito scroll-smooth 
      ${toggleConfirmOrder ? "h-screen overflow-x-hidden" : "h-full"}`}>
      <header 
        className='relative px-5 md:px-10 lg:px-12 xl:px-14 xxl:px-24 bg-Lightest/85' 
        ref={cartRef}
      >
        <Header 
          totalItemInCartQuantity={totalItemInCartQuantity}
          handleToggleCart={handleToggleCart}
        />
        <div className={`px-3 md:px-6 xxl:px-12 absolute z-50 bottom-0 top-20 w-full
          right-0 left-0 md:w-[510px] lg:w-[410px] xl:w-[390px] xxl:w-[470px] md:ml-auto
          ${toggleCart ? "animate-fadeForward" : "hidden"}`}
        >
          <Cart 
            cart={cart}
            totalPrice={totalPrice}
            toggleCart={toggleCart}
            removeFromCart={removeItemFromCart}
            isRemoving={isRemoving}
            handleConfirmOrder={handleConfirmOrder}
          />
        </div>
      </header>
      {toggleConfirmOrder && (
        <section
        onClick={handleOverlayClick}
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
           from-Darkest/95 via-Darkest/70 to-Darkest/60
          h-screen z-[50] flex justify-center items-center `}
        >
          <div className='w-full block mx-5 md:w-max md:mx-0'>
            {truckLoading ? (
              <div className='relative flex items-center justify-center h-full w-max m-auto'>
                <p className='absolute text-[15px] left-[45px] z-10 font-bold text-Lightest'>Loading...</p>
                <TruckLoader />
              </div>
            ) : (
              <div className={`w-full ${!truckLoading ? "animate-fadeIn " : ""}`}>
                <ConfirmOrder 
                  cart={cart}
                  totalPrice={totalPrice} 
                  handleContinueShopping={handleContinueShopping}
                />
              </div>
            )}
          </div>
        </section>
      )}
      <main className='overflow-x-hidden '>
        {selectedItemForReview ? (
          <div className={`${selectedItemForReview ? "animate-fadeInAnim" : ""}`}>
            <Preview 
              item={selectedItemForReview} 
              onBack={handleBackFromReview}
              showIncrement={showIncrement} 
              updateItemQuantity={updateItemQuantity}
              addToCart={addToCart}
              removeFromCart={removeItemQuantity}
              cart={cart}
              className=""
              quantityBtnStyle=""
            />
          </div>
        ) : (
          <div className={`px-5 md:px-10 mt-8 md:mt-10 lg:px-12 xl:px-14 xxl:px-24
            ${selectedItemForReview === null ? "animate-fadeInBackWard" : ""}`}>
            <CategoryList
              categories={categories}
              categoryRefs={categoryRefs}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
            <div className={`pb-20 pt-5 md:pt-14 flex flex-col gap-5 md:grid 
              md:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4
              ${isFadingOut ? "animate-slideIn" : ""}`}>
              {filteredStoreData.map((item) => (
                <StoreItem 
                  key={item.id} 
                  item={item} 
                  showIncrement={showIncrement}
                  cart={cart}
                  addToCart={addToCart}
                  updateItemQuantity={updateItemQuantity}
                  removeFromCart={removeItemQuantity}
                  handleShowReview={handleShowReview}
                  quantityBtnStyle=''
                  addToCartBtnInPreview=''
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
};

export default App;
