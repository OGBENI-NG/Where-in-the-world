import React,{useEffect, useState} from 'react'
import { Country } from './types';

// Define props type with countries array
interface CountryListProps {
  filteredCountries: Country[];
  elementTheme: string;
  onPreview: (country: Country) => void;
}

export const CountryList: React.FC<CountryListProps> = ({filteredCountries, elementTheme, onPreview}) => {
 
  return (
    <section className={`w-full mt-8 md:mt-12 pb-28`}>
      <ul className={`w-full rounded-lg flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 text-base lg:text-[14px] lg:gap-10 xl:gap-8 xxl:grid-cols-4 xxl:gap-7`}>
        {filteredCountries.map(country => (
          <li key={country.name.common} onClick={() => onPreview(country)}>
            <div className='w-full h-[185px] md:h-[220px] lg:h-[180px]'>
              <img 
                className='w-full h-full object-fill rounded-t-lg' 
                src={country.flags.png}  
                alt={`${country.name.common} flag`} 
              />
            </div>
            <div className={`p-5 py-7 font-semibold ${elementTheme} rounded-b-lg lg:text-[13px]`}>
              <h2 className='pb-3 font-bold lg:text-[15px]'>{country.name.common}</h2>
              <p>Population: <span className='font-[300]'>{country.population}</span></p>
              <p>Region: <span className='font-[300]'>{country.region}</span></p>
              <p>Capital: <span className='font-[300]'>{country.capital ? country.capital[0] : 'N/A'}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
