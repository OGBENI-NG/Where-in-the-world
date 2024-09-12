import React from 'react';
import van from '../assets/img/van.png'
import moneyIcon from '../assets/img/money.png'
import securedIcon from '../assets/img/security.png'
import { FaCcPaypal, FaCcMastercard, FaCcVisa, FaCcStripe } from "react-icons/fa";

type  FooterType = {
  title: string
  img:string
  description: string
}

const footerData: FooterType[] = [
  {
    title: "This is carbon-neutral delivery",
    description: "Lorem ipsum dolor amet consectetur",
    img: van,
  },
  {
    title: "MONEY BACK GUARANTEED",
    description: "Lorem ipsum consectetur",
    img: moneyIcon,
  },
  {
    title: "SECURE PAYMENT GUARANTEE ",
    description: "Lorem ipsum consectetur",
    img: securedIcon,
  },
]


const Footer: React.FC = () => {

  const footIcons = footerData.map((item, index) => (
    <div key={index} className='flex items-center flex-col 
      lg:flex-row lg:items-center leading-none lg:gap-2
       text-Dark'>
      <img 
        src={item.img} 
        alt="illus-icon" 
        className={`size-[60px] lg:size-[50px] ${index === 0 && 'lg:mb-4 md:m-0'}`} 
      />
      <div className='text-[13px] text-center  lg:text-left'>
        <h3 className=' font-bold pt-3 pb-[3px]  lg:p-0 lg:pb-2 uppercase'>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  ))

  return (
    <footer className='bg-MidTwo mt-4'>
      <section className=' bg-Lightest/50 md:px-10 py-14 md:py-12 
        text-Lightest leading-none flex lg:px-12 xl:px-14 xxl:px-24
        flex-col justify-center gap-12 md:gap-0 md:flex-row md:justify-between'>
        {footIcons}
      </section>
      <section 
        className='md:relative md:px-10 lg:px-12 xl:px-14 bg-Lightest/85 py-16 overflow-x-hidden xxl:px-24
          text-center  text-Dark flex gap-5 flex-col 
          items-center justify-center text-[14px] md:justify-between '
        >
        <div className='flex flex-col justify-center gap-5 md:flex-row  
          md:items-start md:gap-[0] w-full md:justify-between '>
          <div>
            <h1 className='text-2xl font-bold text-Brand'>Thirteen
              <span className='text-Dark font-medium text-xl'>store</span>
            </h1>
            <p className='hidden md:block text-left pt-4'>&copy; 2024</p>
          </div>
          <div className='lg:pl-[130px]'>
            <p className='text-center md:text-left'>Payment methods</p>
            <div className='flex items-center justify-center gap-5 text-Dark pt-1 lg:pt-3'>
              <FaCcMastercard className='size-10'/>
              <FaCcVisa className='size-10'/>
              <FaCcPaypal className='size-10'/>
              <FaCcStripe className='size-10'/>
            </div>
          </div>
          <div className='md:text-left lg:pr-16'>
            <p>Terms & Conditions | About Us</p>
            <p className='pt-5'>All Right Reserved.</p>
          </div>
          <p className='md:hidden'>&copy; 2024</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
