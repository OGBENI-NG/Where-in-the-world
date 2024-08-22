import React, { useState, useRef, useEffect} from 'react';
import { useTheme } from '../Hook/ThemeContext';
import Header from './Header';
import StoreItem from './StoreItem';
import { storeData, ThirteenStoreData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up
import CategoryList from './CategoryList';
import Cart from './Cart';
import Footer from './Footer';
import Preview from './Preview';


const App: React.FC = () => {
  const { theme, setTheme, toggle, handleToggle } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  // State to store items in the cart
  const [cart, setCart] = useState<ThirteenStoreData[]>([]);
  // State to show increment button for each item
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  //state to add animation to remove item from cart
  const [isRemoving, setIsRemoving] = useState<{[key: string]: boolean}>({});
  // State to show the cart
  const [toggleCart, setToggleCart] = useState<boolean>(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingInLeft, setIsFadingInLeft] = useState(false);

 
  const [selectedItemForReview, setSelectedItemForReview] = useState<ThirteenStoreData | null>(null);
  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];
  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);
  // Calculate total quantity of items in the cart
  const totalCartItem = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

   // Toggle Cart State Function
   const handleToggleCart = () => {
    setToggleCart(prevState => !prevState);
  };

  useEffect(() => {
    // Handle click outside the cart modal
    const handleClickOutsideCartModal = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setToggleCart(false); // Close the cart if the click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutsideCartModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideCartModal);
    };
  }, [cartRef, toggleCart]);


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
    setIsFadingOut(false);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsFadingOut(true);
    }, 300); // Match this duration with your CSS animation duration
    
  };
  
  
  

  const filteredStoreData = React.useMemo(() => {
    return selectedCategory === 'All Category'
      ? storeData
      : storeData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  // Function to add item to the cart
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

  // Function to update item quantity in the cart
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

   // Function to remove or decrement item quantity in the cart
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
        setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
        setShowIncrement({ ...showIncrement, [item.id]: false });
        setTimeout(() => {
          setCart(cart.filter(cartItem => cartItem.id !== item.id));
          setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
        }, 300);
      }
    }
  }

  // Function to remove item from the cart
  function removeItemFromCart(item: ThirteenStoreData) {
    setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setShowIncrement({ ...showIncrement, [item.id]: false });
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
      setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
    }, 300);
  }


  function handleShowReview(item: ThirteenStoreData) {
    setSelectedItemForReview(item);
  }

  function handleBackFromReview() {
    setSelectedItemForReview(null);
  }

  return (
    <div className="bg-Light h-screen font-Nunito  overflow-x-auto">
      
      <header className='relative px-5 bg-Lightest/85' ref={cartRef}>
        <Header 
          totalCartItem={totalCartItem}
          handleToggleCart={handleToggleCart}
        />
        <div className={`px-5 absolute z-50 bottom-0 top-20 w-full right-0 left-0  
          ${toggleCart ? "animate-fadeForward" : "hidden"}`}>
          <Cart 
            cart={cart}
            totalPrice={totalPrice}
            toggleCart={toggleCart}
            removeFromCart={removeItemFromCart}
            isRemoving={isRemoving}
          />
        </div>
      </header>
      <main  className='overflow-x-hidden'>
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
        <div className={`px-5 mt-8 ${selectedItemForReview === null ? "animate-fadeInBackWard" : ""}`}>
          <CategoryList
            categories={categories}
            categoryRefs={categoryRefs}
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
          <div className={`pb-20 pt-1 ${isFadingOut && "animate-slideIn"}`}>
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
