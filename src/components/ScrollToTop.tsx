import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";

type ScrollProps = {
  elementTheme: string
}

const ScrollToTopButton: React.FC<ScrollProps> = ({elementTheme}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isFading, setIsFading] = useState<boolean>(false);
  const timeoutRef = useRef<number | null>(null);

  // Function to scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  
  // Function to toggle visibility based on scroll position
  const toggleVisibility = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = document.documentElement.scrollHeight;
    const triggerHeight = windowHeight * 0.0; // Trigger at 10% of the scroll

    if (scrollPosition > triggerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    // When the user scrolls, reset the opacity back to normal
    setIsFading(false);

    // Clear previous timeout
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    // Set a timeout to reduce opacity after 3 seconds of inactivity
    timeoutRef.current = window.setTimeout(() => {
      setIsFading(true);
    }, 1000);
  };

  // Add an event listener to track scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='fixed bottom-8 right-0 z-50 flex items-center w-full'>
      {isVisible && (
        <button
          onClick={scrollToTop}
          type='button'
          className={`${elementTheme} 
             text-Lightest px-2 py-1 flex items-center gap-2 m-auto
             text-[13px] rounded-lg transition-opacity duration-300 lg:absolute lg:right-5 lg:bottom-6
            ${isFading ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}
        >
          <IoMdArrowRoundUp /> Back to top
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
