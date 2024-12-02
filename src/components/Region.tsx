import React from 'react'
import { FaChevronUp } from "react-icons/fa";

type RegionProps = {
  region: string[];
  theme: string;
  elementTheme: string;
  toggleRegionBtn: () => void; 
  toggledRegionEl: boolean;  
  selectedRegion: string;
  selectRegion: (region: string) => void;  
  regionRef: React.RefObject<HTMLDivElement>
}

export const Region: React.FC<RegionProps> = ({region, theme, toggleRegionBtn, elementTheme, toggledRegionEl, selectRegion, regionRef}) => {

  const regionEl = region.map((regionName) => (
    <p 
      key={regionName} 
      onClick={() => selectRegion(regionName)}
      className='py-2 px-4 text-base lg:text-[14px] cursor-pointer hover:bg-slate-500/40 rounded-lg'>
       {regionName === "All" ? "All Countries": regionName}
    </p>
  ))  

  return (
    <section className={`pt-12 w-[280px] lg:w-[200px] lg:pt-10 z-50 lg:ml-auto`} >
      <div className='w-full relative' ref={regionRef}>
        <button 
          type='button' 
          onClick={toggleRegionBtn}
          className={`w-full ${elementTheme} text-base font-medium py-4 px-7 
          text-left flex items-center rounded-lg lg:text-[14px] lg:py-[10px] lg:px-4`}>
          Filter by Region 
          <FaChevronUp className={`transition-all ${toggledRegionEl ? 'rotate-180' : '-rotate-0'} ml-auto size-[14px]`}/>
        </button>  
        <div className={`absolute w-full overflow-hidden transition-all 
          ${toggledRegionEl ? 'h-[265px] opacity-100' : 'h-0 opacity-0'} ${elementTheme} mt-[5px] px-3 py-3 rounded-lg`}>
        {regionEl}
        </div>

      </div>
    </section>
  )
}
