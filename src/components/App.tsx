import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './Theme-context';
import { Header } from './Header';
import { Form } from './Form';
import { Region } from './Region';
import { CountryList } from './Country';
import { Country } from './types';
import { PreviewCountry } from './PreviewCountry';
import earthImg from '../assets//img/earth.png'


const App: React.FC = () => {
  const region:string[] = ['All','Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  const [toggledRegionEl, setToggedRegionEl] = useState<boolean>(false)
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // State for search query and selected region
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [previewCountry, setPreviewCountry] = useState<Country | null>(null); // Selected country for preview
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const regionRef = useRef<HTMLDivElement>(null);

  const {theme, toggleTheme} = useTheme();
  const elementTheme = theme === 'light' ? ("bg-White text-VeryDarkBlueTwo shadow-[0px_0px_6px_1px] shadow-DarkBlue/25") 
   : ("bg-DarkBlue shadow-[0px_0px_6px_1px] text-White shadow-VeryDarkBlueTwo/25")
  ;

  const fetchCountries = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Check your internet connection and try again');
      }
      const data: Country[] = await response.json();
      setAllCountries(data);
      setCountries(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    // Call the fetchCountries function to initiate the data fetch
    fetchCountries();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Filtered countries based on search query and selected region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  function searchCountryInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function toggleRegionBtn() {
    setToggedRegionEl(prevT => !prevT)
  }

  function selectRegion(region: string) {
    setSelectedRegion(region)
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    },500);
    setToggedRegionEl(false)
    setSearchQuery('')
  }

  const showPreview = (country: Country) => {
    setScrollPosition(window.scrollY); // Save current scroll position
    setPreviewCountry(country);
    window.scrollTo(0, 0); // Scroll to top
  };

  const closePreview = () => {
    setPreviewCountry(null);
  };

  // Restore scroll position once `previewCountry` is closed
  useEffect(() => {
    if (!previewCountry) {
      window.scrollTo(0, scrollPosition);
    }
  }, [previewCountry, scrollPosition]);

  // Close cart modal when clicking outside of it
  useEffect(() => {
    const handleClickOutsideRegionModal = (event: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(event.target as Node)) {
        setToggedRegionEl(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutsideRegionModal);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideRegionModal);
    };
  }, [regionRef, toggledRegionEl]);
  


  return (
    <div className={`font-Nunito 
       
      ${theme === "light" ? 'bg-VeryLightGray' : 'bg-VeryDarkBlue'} scroll-smooth 
      ${loading || error ? 'h-screen overflow-x-hidden' : 'h-auto'} scroll-smooth`}
    >
      <Header 
        elementTheme={elementTheme}
        theme={theme}
        toggled={toggleTheme}
      />
      <div className='px-6 py-10 md:px-12 lg:px-[76px] xxl:px-[100px] overflow-auto'>
        {previewCountry ?
         (
            <PreviewCountry 
              country={previewCountry}
              theme={theme}
              elementTheme={elementTheme}
              onClose={closePreview}
              allCountries={allCountries}
              onCountrySelect={showPreview}
            />
          ) : (
            <section>
              <div className={`${loading || error  ? 'opacity-0' : ''} lg:flex items-center`}>
                <Form 
                  elementTheme={elementTheme} 
                  theme={theme}
                  searchCountryInput={searchCountryInput}
                  searchQuery={searchQuery}
                />
                <Region
                  region={region}
                  theme={theme}
                  elementTheme={elementTheme}
                  toggleRegionBtn={toggleRegionBtn}
                  toggledRegionEl={toggledRegionEl}
                  selectedRegion={selectedRegion}
                  selectRegion={selectRegion}
                  regionRef={regionRef}
                />
              </div>
              <div>
                {loading ? 
                  (
                    <div className='absolute inset-0 h-full'>
                      <div className="flex justify-center h-full flex-col items-center overflow-x-hidden bg-VeryDarkBlue/35">
                        <div 
                          className='h-[150px] w-[150px] bg-size-custom bg-cover bg-center animate-spinEarth rounded-full' 
                          style={{ backgroundImage: `url(${earthImg})` }}>
                        </div>
                    </div>
                    </div>
                  ) : (
                    <div>
                      {error ? 
                        (
                          <p className={`
                            ${theme === 'light' ? 'text-VeryDarkBlueTwo' :'text-White'} 
                            shadow-none bg-none text-center lg:pt-12 text-2xl font-bold`}>500 Server Error
                            <span className='block font-medium pt-5'>{error}</span>
                            <button onClick={fetchCountries} type='button' className='mt-12 text-[14px] border-2 py-1 px-6 '>Back home</button>
                          </p>
                        ) : (
                          <div>
                            <CountryList
                              filteredCountries={filteredCountries}
                              elementTheme={elementTheme}
                              onPreview={showPreview}
                            />
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </section>
          )
        }
      </div>
    </div>
  );
};
export default App;
