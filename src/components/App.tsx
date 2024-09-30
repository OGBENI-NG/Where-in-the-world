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
import ScrollToTopButton from './ScrollToTop';


const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [isRemoving, setIsRemoving] = useState<{ [key: string]: boolean }>({});
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [toggleConfirmOrder, setToggleConfirmOrder] = useState<boolean>(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [truckLoading, setTruckLoading] = useState<boolean>(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<ThirteenStoreData | null>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];
  const [cart, setCart] = useState<ThirteenStoreData[]>(loadStoredCart);
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>(loadStoredShowIncrement);

  // Total price of the items in the cart, calculated dynamically
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);

  // Total number of items in the cart
  const totalItemInCartQuantity = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  
  // Load cart data from localStorage when the app first loads
  function loadStoredCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  // Load increment visibility from localStorage
  function loadStoredShowIncrement() {
    const showIncrement = localStorage.getItem('showIncrement');
    return showIncrement ? JSON.parse(showIncrement) : {};
  };

  // Store cart and showIncrement in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('showIncrement', JSON.stringify(showIncrement));
  }, [cart, showIncrement]);
  
  // Toggles cart modal visibility
  const handleToggleCart = () => {
    setToggleCart(prevState => !prevState);
  };

  // Handles order confirmation process and triggers truck loading animation
  const handleConfirmOrder = () => {
    setTruckLoading(true);
    setToggleConfirmOrder(true);
    setToggleCart(false);
    setTimeout(() => {
      setTruckLoading(false);
    }, 3000); // Simulates loading delay
  };

  // Closes the confirmation modal and continues shopping
  const handleContinueShopping = () => {
    setToggleConfirmOrder(false);
  };

  // Close cart modal when clicking outside of it
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

  // Adjusts the underline position and width when a category is selected
  useEffect(() => {
    const PADDING = 8;
    const activeIndex = categories.findIndex(
      (category) => category.toLowerCase() === selectedCategory.toLowerCase()
    );
    const activeElement = categoryRefs.current[activeIndex];
    if (activeElement) {
      const left = activeElement.offsetLeft - PADDING;
      const width = activeElement.offsetWidth + PADDING * 2;

      // Apply calculated left and width to CSS variables for the underline
      document.documentElement.style.setProperty('--underline-left', `${left}px`);
      document.documentElement.style.setProperty('--underline-width', `${width}px`);
    }
  }, [selectedCategory, categories]);

  // Handles category selection with fade-in/out animation
  const handleCategoryClick = (category: string) => {
    setIsFadingOut(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsFadingOut(true);
    }, 100); // Adds a delay before switching the category
  };

  // Filters store data based on the selected category
  const filteredStoreData = React.useMemo(() => {
    return selectedCategory === 'All Category'
      ? storeData
      : storeData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  // Adds an item to the cart or updates its quantity if it's already in the cart
  function addToCart(item: ThirteenStoreData) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item); // If item exists, update its quantity
    } else {
      setCart([{ ...item, quantity: 1 }, ...cart]);
      setShowIncrement({ ...showIncrement, [item.id]: true });
    }
    setToggleCart(false);
  }

  // Increments the quantity of an existing cart item
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

  // Decreases the quantity of an item, removes it if the quantity is 0
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
        // If quantity is 0, remove the item from the cart
        setToggleCart(false);
        setShowIncrement({ ...showIncrement, [item.id]: false });
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
      }
    }
  }

  // Removes an item from the cart with a fade-out animation
  function removeItemFromCart(item: ThirteenStoreData) {
    setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setShowIncrement({ ...showIncrement, [item.id]: false });
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
      setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
    }, 250); // Animation delay before removing item
  }

  // Shows the review modal for the selected item and saves the current scroll position
  function handleShowReview(item: ThirteenStoreData) {
    setScrollPosition(window.scrollY);
    setSelectedItemForReview(item);
    window.scrollTo(0, 0); // Scroll to top when showing the preview
  }

  // Goes back from the review and restores the previous scroll position
  function handleBackFromReview() {
    setSelectedItemForReview(null);
    window.scrollTo(0, scrollPosition); // Restore scroll position
  }

  // Handles closing the confirmation modal when clicking outside of it
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
    if(truckLoading) {
      //do nothing when the truck loading is true
      return 
    }

    if (e.target === e.currentTarget) {
      setToggleConfirmOrder(false); 
    }
  };

  return (
    <div className={`bg-Light font-Nunito scroll-smooth
      ${toggleConfirmOrder ? "h-screen overflow-x-hidden" : "h-full"}`}>
      <header 
        className='relative px-3 ml:px-4 md:px-6 lg:px-12 xl:px-16 xxl:px-28 bg-Lightest/85' 
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
          <div className={`px-3 ml:px-4 md:px-6 mt-8 md:mt-10 lg:px-12 xl:px-16 xxl:px-28
            ${selectedItemForReview === null ? "animate-fadeInBackWard" : ""}`}>
            <CategoryList
              categories={categories}
              categoryRefs={categoryRefs}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
            <div className={`pb-20 pt-5 md:pt-14 flex flex-col gap-5 md:grid 
              md:grid-cols-2 md:gap-5 lg:gap-4 lg:grid-cols-3 xl:grid-cols-4 xxl:gap-5
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
        <ScrollToTopButton/>
      </main>
      <Footer/>
    </div>
  );
};
export default App;
