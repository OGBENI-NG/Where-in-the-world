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
    <section className={`w-full px-8 mt-8 pb-28`}>
      <ul className={`w-full rounded-lg flex flex-col gap-12 text-base `}>
        {filteredCountries.map(country => (
          <li key={country.name.common}>
            <div className='w-full h-[185px]'>
              <img 
                onClick={() => onPreview(country)}
                className='w-full h-full object-fill rounded-t-lg' 
                src={country.flags.png}  
                alt={`${country.name.common} flag`} 
              />
            </div>
            <div className={`p-5 py-7 font-semibold ${elementTheme} rounded-b-lg`}>
              <h2 className='pb-3 font-bold'>{country.name.common}</h2>
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
