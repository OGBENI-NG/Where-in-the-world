import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './Theme-context';
import { Header } from './Header';
import { Form } from './Form';
import { Region } from './Region';
import { CountryList } from './Country';
import { Country } from './types';
import { PreviewCountry } from './PreviewCountry';


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

  const {theme, toggleTheme} = useTheme();
  const elementTheme = theme === 'light' ? ("bg-White text-VeryDarkBlueTwo shadow-[0px_0px_8px_2px] shadow-DarkBlue/25") 
   : ("bg-DarkBlue shadow-[0px_0px_8px_2px] text-White shadow-VeryDarkBlueTwo/25")
  ;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // Fetch data from the REST Countries API
        const response = await fetch('https://restcountries.com/v3.1/all');
        // Check if the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        // Parse the JSON response into Country type array
        const data: Country[] = await response.json();
        setAllCountries(data)
        // Update state with fetched countries
        setCountries(data);
        setLoading(false);
      } catch (err) {
        // Handle error by setting error state and stopping loading
        setError((err as Error).message);
        setLoading(false);
      }
    };
    
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
  


  return (
    <div className={`font-Nunito ${theme === "light" ? 'bg-VeryLightGray' : 'bg-VeryDarkBlue'} scroll-smooth h-full`}>
      <Header 
        elementTheme={elementTheme}
        theme={theme}
        toggled={toggleTheme}
      />
      <div className=' px-6'>
        {previewCountry ?
         (
            <div>
              <PreviewCountry 
                country={previewCountry}
                theme={theme}
                elementTheme={elementTheme}
                onClose={closePreview}
                allCountries={allCountries}
                onCountrySelect={showPreview}
              />
            </div>
          ) : (
            <section>
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
              />
              <div>
                {loading ? 
                  (
                    <div>loading...</div>
                  ) : (
                    <div>
                      {error ? 
                        (
                          <div>{error}</div>
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
