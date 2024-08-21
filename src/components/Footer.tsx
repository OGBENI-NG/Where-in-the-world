import React from 'react';
import van from '../assets/img/van.png'
import moneyIcon from '../assets/img/money.png'
import securedIcon from '../assets/img/security.png'

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
      <section className='bg-Dark px-5 py-16 text-Lightest leading-none'>
        {footerData.map((item, index) => (
          <div key={index} className='flex flex-col items-center pb-12'>
            <img src={item.img} alt="illus-icon" 
            className={`${index === 1 || index === 2 ? "size-20" : " "}`} />
            <h3 className='text-base font-bold pt-3 pb-[3px] uppercase'>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>
      <section>

      </section>
    </footer>
  );
}

export default Footer;
