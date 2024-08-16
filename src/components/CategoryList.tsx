import React, { MutableRefObject } from 'react';

type CategoryListProps = {
  categories: string[];
  categoryRefs: MutableRefObject<(HTMLLIElement | null)[]>;
  selectedCategory: string;
  handleCategoryClick: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  categoryRefs,
  selectedCategory,
  handleCategoryClick,
}) => {
  return (
    <ul className="relative flex justify-center items-center gap-5 text-Dark font-bold text-base leading-none bg-Lightest p-3 rounded-lg">
      {categories.map((category, index) => (
        <li
          key={category}
          ref={(el) => {
            categoryRefs.current[index] = el;
          }}
          className={`cursor-pointer font-semibold ${
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
