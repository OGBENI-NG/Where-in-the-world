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
            className={`px-6 ${elementTheme} py-2 rounded-[5px]`} // Optional styling class
          >
            {borderCountry.name.common}
          </button>
        );
      })
    : 'N/A';

    const elementStyle =`flex flex-col leading-none gap-4`;
    const detailsTxt = theme === 'light' ? 'text-VeryDarkBlueTwo' : 'text-White';

  return (
    <section className="py-10">
      <div className='pb-16'>
        <button 
          type='button' 
          onClick={onClose} 
          className={`${elementTheme} flex items-center text-base gap-4 py-2 px-8 rounded-[5px]`}>
            <FaArrowLeftLong className='text-xl'/> Back
        </button>
      </div>
      <div className='w-full h-[250px]'>
        <img src={country.flags.png} alt={`${country.name.common} flag`} className='w-full h-full' />
      </div>
      <div className={`${detailsTxt} shadow-none bg-none`}>
        <div>
          <h2 className='text-base font-[800] pt-10 pb-5'>{country.name.common}</h2>
          <div className= {`${elementStyle}`}>
            <p><strong>Native Name:</strong> {firstNativeName.common}</p>
            <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> {country.region}</p>
            <p><strong>SubRegion:</strong> {country.subregion}</p>
            <p><strong>Capital:</strong> {country.capital.join(', ')}</p>
          </div>
        </div>
        <div className={`py-10 ${elementStyle}`}>
          <p><strong>Top Level Domain:</strong> {country.tld}</p>
          <p><strong>Currencies</strong> {currencies}</p>
          <p><strong>Top Level Domain:</strong> {languages}</p>
        </div>
        <div className=''>
          <strong>Border Countries:</strong>
          <p className=' flex gap-3 flex-wrap pt-6'>{borderCountryElements}</p>
        </div>
      </div>
    </section>
  );
};
