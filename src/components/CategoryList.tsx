import React, { MutableRefObject } from 'react';

type CategoryListProps = {
  categories: string[];  // Array of category names
  categoryRefs: MutableRefObject<(HTMLLIElement | null)[]>;  // Ref object to keep track of the category list items
  selectedCategory: string;  // Currently selected category
  handleCategoryClick: (category: string) => void;  // Function to handle category click event
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories, 
  categoryRefs,  
  selectedCategory,
  handleCategoryClick, 
}) => {
  return (
    <ul className="relative flex justify-center gap-4 md:gap-16 items-center
     text-Dark font-bold text-[15px] leading-none bg-Lightest p-3 md:px-10 ml:gap:8 ml:justify-evenly
    rounded-lg text-center md:w-max md:m-auto">
      {categories.map((category, index) => (
        <li
          key={category} 
          ref={(el) => { categoryRefs.current[index] = el }}
          className={`cursor-pointer font-semibold hover:text-Brand ${
            selectedCategory.toLowerCase() === category.toLowerCase() ? 'active-category' : ''
           
          }`}
          onClick={() => handleCategoryClick(category)}  
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </li>
      ))}
      <li className="underline"></li> 
    </ul>
  );
};

export default CategoryList;

