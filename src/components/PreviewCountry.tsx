import React from 'react';
import { Country } from './types';
import { FaArrowLeftLong } from "react-icons/fa6";

type CountryPreviewProps = {
  country: Country; // Now expecting a single Country
  onClose: () => void;
  allCountries: Country[]; 
  onCountrySelect: (country: Country) => void;
  theme: string;
  elementTheme: string;
  
};

export const PreviewCountry: React.FC<CountryPreviewProps> = ({ country, onClose, allCountries, onCountrySelect, theme, elementTheme }) => {
  // Get the first native name
  const firstNativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]
    : { common: 'N/A', official: 'N/A' };
  ;

  // Extract currencies in a readable format
  const currencies = country.currencies
    ? Object.values(country.currencies).map(currency => `${currency.name}`).join(', ')
    : 'N/A';
  ;

  // Extract the language in readable format
  const languages = country.languages 
    ? Object.values(country.languages).join(', ')
    : 'N/A'
  ;

  const borderCountryElements = country.borders
    ? country.borders.map(code => {
        const borderCountry = allCountries.find(c => c.cca3 === code);
        if (!borderCountry) return null;
        return (
          <button
            type='button' 
            key={code} 
            onClick={() => onCountrySelect(borderCountry)} // Set selected country on click
            className={`px-6 ${elementTheme} py-2 rounded-[5px] lg:py-1 lg:px-3 text-base lg:text-[14px]`} // Optional styling class
          >
            {borderCountry.name.common}
          </button>
        );
      })
    : <p className='font-bold text-xl'>N/A</p>
  ;

  const elementStyle =`flex flex-col leading-none gap-4 lg:gap-3`;
  const detailsTxt = theme === 'light' ? 'text-VeryDarkBlueTwo' : 'text-White';

  return (
    <section className="pb-8 md:h-screen">
      <div className='lg:mt-8'>
        <div className='pb-16 lg:pb-12 pl-1'>
          <button 
            type='button' 
            onClick={onClose} 
            className={`${elementTheme} flex items-center text-base gap-3 py-2 px-7 rounded-[5px]`}>
              <FaArrowLeftLong className='text-xl'/> Back
          </button>
        </div>
        <div className='h-full xl:h-[420px]'>
          <div className='lg:grid grid-cols-2 gap-14 lg:gap-12 lg:overflow-hidden lg:pb-4 h-full'>
            <div className='w-full h-[220px] md:w-full md:h-[450px] lg:h-[320px]'>
              <img src={country.flags.png} alt={`${country.name.common} flag`} className='w-full h-full ' />
            </div>
            <div>
              <div className={`${detailsTxt} `}>
                <div className='lg:text-[14px] shadow-none bg-none md:flex items-center gap-14 lg:gap-9 '>
                  <div className='w-full h-auto'>
                    <h2 className='text-base lg:text-lg font-[800] pt-10 pb-5 lg:py-5'>{country.name.common}</h2>
                    <div className= {`${elementStyle} leading-normal`}>
                      <p><strong>Native Name:</strong> {firstNativeName.common}</p>
                      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                      <p><strong>Region:</strong> {country.region}</p>
                      <p><strong>SubRegion:</strong> {country.subregion}</p>
                      <p className='flex-grow'><strong>Capital:</strong> {country.capital.join(', ')}</p>
                    </div>
                  </div>
                  <div className={`py-10 lg:p-0 ${elementStyle} w-full leading-normal`}>
                    <p><strong>Top Level Domain:</strong> {country.tld}</p>
                    <p><strong>Currencies</strong> {currencies}</p>
                    <p className='leading-normal'><strong>Top Level Domain:</strong> {languages}</p>
                  </div>
                </div>
                <div className={`${detailsTxt} py-3 md:flex items-baseline lg:items-center gap-8 lg:p-0 lg:pt-5 w-full`}>
                  <strong className='text-base lg:text-[14px] block  w-max'>Border Countries:</strong>
                  <p className=' flex gap-3 flex-wrap items-center pt-3 md:pt-5 lg:p-0 '>{borderCountryElements}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
