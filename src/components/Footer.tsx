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
    <div key={index} className='flex items-center flex-col'>
      <img 
        src={item.img} 
        alt="illus-icon" 
        className={`size-[65px] ${index === 0 && '-mb-3 md:m-0'}`} 
      />
      <h3 className='text-[14px] font-bold pt-3 pb-[3px] uppercase'>{item.title}</h3>
      <p className='text-[13px]'>{item.description}</p>
    </div>
  ))

  return (
    <footer>
      <section className=' bg-Darkest/95 md:px-10 py-12 md:py-14 
        text-Lightest leading-none flex lg:px-12 xl:px-14
        flex-col justify-center gap-12 md:gap-0 md:flex-row md:justify-between'>
        {footIcons}
      </section>
      <section 
        className='md:relative md:px-10 lg:px-12 xl:px-14 bg-Darkest py-12 overflow-x-hidden 
          text-center  text-Light flex gap-5 flex-col 
          items-center justify-center text-[14px] md:justify-between'
        >
        <div className='flex flex-col justify-center gap-5 md:flex-row  
          md:items-start md:gap-[0] w-full md:justify-between '>
          <div>
            <h1 className='text-2xl font-bold text-Brand'>Thirteen
              <span className='text-Light font-medium text-xl'>store</span>
            </h1>
            <p className='hidden md:block text-left pt-6'>&copy; 2024</p>
          </div>
          <div className=''>
            <p>Payment methods</p>
            <div className='flex items-center justify-center gap-5 text-Mid/75 pt-1'>
              <FaCcMastercard className='size-10'/>
              <FaCcVisa className='size-10'/>
              <FaCcPaypal className='size-10'/>
              <FaCcStripe className='size-10'/>
            </div>
          </div>
          <div>
            <p>Terms & Conditions | About Us</p>
            <p className='pt-6'>All Right Reserved.</p>
          </div>
          <p className='md:hidden'>&copy; 2024</p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
