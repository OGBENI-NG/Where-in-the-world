import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../Hook/ThemeContext';
import Header from './Header';
import Main from './Main';
import { storeData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up

const App: React.FC = () => {
  const { theme, setTheme, toggle, handleToggle } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All category');
  const categoryRefs = useRef<Array<HTMLLIElement | null>>([]);

  const categories = ['All category', 'chair', 'table', 'bed', 'shelve'];

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
    return selectedCategory === 'All category'
      ? storeData
      : storeData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [selectedCategory]);

  return (
    <div className="bg-Light h-screen font-Nunito px-5">
      <Header />
      <div>
        <ul className="relative flex justify-center items-center gap-5 text-Dark 
          font-semibold text-sm leading-none bg-Lightest p-3 rounded-lg">
          {categories.map((category, index) => (
            <li
              key={category}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`cursor-pointer ${
                selectedCategory.toLowerCase() === category.toLowerCase() ? 'active-category ' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
          <li className="underline"></li>
        </ul>
        {filteredStoreData.map((item) => (
          <Main key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default App;
