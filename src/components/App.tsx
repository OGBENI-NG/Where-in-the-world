import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { useTheme } from '../Hook/ThemeContext';
import Header from './Header';
import StoreItem from './StoreItem';
import { storeData } from '../data';
import '../../src/index.css'; // Ensure you have this file set up
import CategoryList from './CategoryList';

const App: React.FC = () => {
  const { theme, setTheme, toggle, handleToggle } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Category');
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);

  const categories = ['All Category', 'chair', 'table', 'bed', 'shelve'];

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

  return (
    <div className="bg-Light h-screen font-Nunito px-5 overflow-x-auto">
      <Header />
      <main>
        <CategoryList
          categories={categories}
          categoryRefs={categoryRefs}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
        <div className='mt-8'>
          {filteredStoreData.map((item) => (
            <StoreItem key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
