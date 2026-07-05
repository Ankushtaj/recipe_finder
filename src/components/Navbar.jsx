import React, { useState } from 'react'
import Logo from '../assets/mylogo.png'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='w-full fixed z-10 bg-black opacity-85'>
            <nav className='flex w-full py-2 px-4 sm:py-3 md:px-15 lg:px-20 items-center justify-between'>
                <a href="/" className='flex items-center justify-center gap-2 cursor-pointer'>
                    <img src={Logo} className='hidden sm:block w-7 h-7 lg:w-12 lg:h-12' />
                    <div className='text-gray-100 opacity-90 text-xl sm:text-xl md:text-2xl font-medium font-serif'>Quick<span>Cuisine</span></div>
                </a>
                <ul className='hidden sm:flex text-gray-50 gap-6'>
                    <li className='hover:text-orange-300 duration-200'>
                        <a href="#home">Home</a>
                    </li>
                    <li className='hover:text-orange-300 duration-200'>
                        <a href="#explore">Explore</a>
                    </li>
                    <li className='hover:text-orange-300 duration-200'>
                        <a href="#follow">Follow Us</a>
                    </li>
                </ul>

                <button className='block sm:hidden text-gray-50 text-xl'
                    onClick={()=> {(open==true)?setOpen(false):setOpen(true)}}>
                    {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
                </button>
            </nav>
            <div className={`${(open==true) ? "flex" : "hidden"} bg-black flex-col w-full px-4 py-6 text-gray-50 gap-6 text-[14px]`}>
                <a href="#home" className='hover:text-orange-300 duration-200' onClick={() => setOpen(false)}>Home</a>
                <a href="#explore" className='hover:text-orange-300 duration-200' onClick={() => setOpen(false)}>Explore</a>
                <a href="#follow" className='hover:text-orange-300 duration-200' onClick={() => setOpen(false)}>Follow Us</a>
            </div>
        </div>
    )
}

export default Navbar