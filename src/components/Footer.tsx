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
  return (
    <footer>
      <section className='bg-Darkest/95 px-5 py-16 text-Lightest leading-none'>
        {footerData.map((item, index) => (
          <div key={index} className='flex flex-col items-center pb-12'>
            <img src={item.img} alt="illus-icon" 
            className={`${index === 1 || index === 2 ? "size-[65px]" : " h-[50px] w-[75px]"}`} />
            <h3 className='text-[14px] font-bold pt-3 pb-[3px] uppercase'>{item.title}</h3>
            <p className='text-[13px]'>{item.description}</p>
          </div>
        ))}
      </section>
      <section className='bg-Darkest py-12 overflow-x-hidden text-center
         text-Light flex gap-5 flex-col items-center justify-center text-[14px]'>
        <h1 className='text-2xl font-bold text-Brand'>Thirteen
          <span className='text-Light font-medium text-xl'>store</span>
        </h1>
        <div className=''>
          <p>Payment methods</p>
          <div className='flex items-center gap-2 text-Mid/75'>
            <FaCcMastercard className='size-12'/>
            <FaCcVisa className='size-12'/>
            <FaCcPaypal className='size-12'/>
            <FaCcStripe className='size-12'/>
          </div>
        </div>
        <div>
          <p>Terms & Conditions | About Us</p>
          <p>All Right Reserved.</p>
        </div>
        <p>&copy; 2024</p>
      </section>
    </footer>
  );
}

export default Footer;
