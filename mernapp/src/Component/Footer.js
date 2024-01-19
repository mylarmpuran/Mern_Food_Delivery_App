import React, {useState} from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";


function Footer() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className='bg-[#2699fb] p-4 ' >
      <div className='max-w-[1240px] py-[10px] items-center border flex justify-between border-black mx-auto'>
        <div className='text-3xl font-bold'>
         @ 2024
        </div>
        {
          toggle ?
          <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-white text-2x1 md:hidden block' />
          : <IoMdClose onClick={() => setToggle(!toggle)} className='text-white text-2x1 md:hidden block' />

        }
        
        
        <ul className='hidden md:flex text-white gap-10'>
          <li>
            Home
          </li>
          <li>
            Login
          </li>
        </ul>
        {/* Responsive*/}
        <ul className={`duration=300 md:hidden w-full h-screen text-white fixed bg-black top-[108px]
         ${toggle ? 'left-[0]' : 'left-[-100%]'}
         `}>
          <li className='p-5'>
            Home
          </li>
          <li className='p-5'>
            Login
          </li>
        </ul>

      </div>     
      </div>
  )
}

export default Footer