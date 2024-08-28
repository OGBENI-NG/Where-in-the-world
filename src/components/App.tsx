import React, { useState, useRef, useEffect} from 'react';
import Header from './Header';
import StoreItem from './StoreItem';
import { storeData, ThirteenStoreData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up
import CategoryList from './CategoryList';
import Cart from './Cart';
import Footer from './Footer';
import Preview from './Preview';
import ConfirmOrder from './ConfirmOrder';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [cart, setCart] = useState<ThirteenStoreData[]>([]);
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  const [isRemoving, setIsRemoving] = useState<{[key: string]: boolean}>({});
  const [toggleCart, setToggleCart] = useState<boolean>(false)
  const [toggleConfirmOrder, setToggleConfirmOrder] = useState<boolean>(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const [isFadingOut, setIsFadingOut] = useState(false);

  const [selectedItemForReview, setSelectedItemForReview] = useState<ThirteenStoreData | null>(null);
  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);
  const totalCartItem = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleToggleCart = () => {
    setToggleCart(prevState => !prevState);
  };

  const handleConfirmOrder = () => {
    setToggleConfirmOrder(true);  // Open ConfirmOrder when this function is called
    setToggleCart(false);
  };

  const handleContinueShopping = () => {
    setToggleConfirmOrder(false)
  }

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
  


  const PADDING = 8; // Adjust the padding as needed

  useEffect(() => {
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
    setToggleCart(false)
  }

  function updateItemQuantity(item: ThirteenStoreData) {
    setCart(
      cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
    setToggleCart(false)
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
        setToggleCart(false)
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
    setSelectedItemForReview(item);
  }

  function handleBackFromReview() {
    setSelectedItemForReview(null);
  }

  return (
    <div className="bg-Light h-screen font-Nunito overflow-x-auto">
      <header 
        className='relative px-5 md:px-10 lg:px-12 xl:px-14 xxl:px-24 bg-Lightest/85' 
        ref={cartRef}
      >
        <Header 
          totalCartItem={totalCartItem}
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
      <section
        className={`absolute inset-0  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-Dark via-Mid to-Light h-full z-[100] 
          ${toggleConfirmOrder ? 'block' : 'hidden'}`}
      >
        <ConfirmOrder 
          cart={cart}
          totalPrice={totalPrice} 
          handleContinueShopping={handleContinueShopping}
        />
      </section>
      <main className='overflow-x-hidden'>
        {selectedItemForReview ? (
          <div className={`${selectedItemForReview ? "animate-fadeIn" : ""}`}>
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
        </div>)}
      </main>
      <Footer/>
    </div>
  );
};

export default App;
