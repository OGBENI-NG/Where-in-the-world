import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";

const ScrollToTopButton: React.FC = () => {
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
    const triggerHeight = windowHeight * 0.1; // Trigger at 10% of the scroll

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
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          type='button'
          className={`fixed bottom-10 right-3 z-50 text-Lightest bg-Brand p-[10px]
            text-3xl rounded-lg shadow-sm shadow-Brand/75 md:p-1 md:right-5 lg:right-6 md:bottom-16 
            transition-opacity duration-300 ${isFading ? 'opacity-40 hover:opacity-100' : 'opacity-100'}`}
        >
          <IoMdArrowRoundUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
