import React, { useEffect, useState } from 'react'
import Banner1 from "../assets/banner1.jpeg";
import Banner2 from "../assets/banner2.jpeg";
import Banner3 from "../assets/banner3.jpeg";
import Banner4 from "../assets/banner4.webp";
import Banner5 from "../assets/banner5.webp";
import mylogo from "../assets/mylogo.png";
import { FaArrowCircleDown } from "react-icons/fa";

const Header = () => {
    const arr=[Banner1,Banner2,Banner3,Banner4,Banner5]
    const [current, setCurrent] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % arr.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div id='home' className='relative w-full h-[100vh] scroll-mt-16'>
            {arr.map((image, index) => (<img key={index} src={image} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3500ms] ${index === current ? "opacity-100" : "opacity-0"}`}/>))}
            <div className='absolute bg-[linear-gradient(to_bottom,rgba(1,0,0,0.1)_0%,rgba(1,0,0,0.5)_35%,rgba(0,0,0,0.9)_100%)] w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-[1.75rem] sm:text-4xl md:text-5xl font-serif font-semibold tracking-tighter sm:tracking-tight text-white pt-8 whitespace-nowrap'><span className='hover:text-orange-300 duration-300'>Find</span> ◦ <span className='hover:text-orange-300 duration-300'>Filter</span> ◦ <span className='hover:text-orange-300 duration-300'>Flavour</span></h1>
                <h1 className='text-[1rem] sm:text-xl md:text-2xl font-normal font-serif italic text-gray-200'>Type You Craving, Find Your Dish</h1>
                <p className='text-xs md:text-sm text-center font-normal text-orange-300 mt-4 tracking-widest bg-[#00000085] px-4 py-2 rounded-full'>Welcome to <span className='text-gray-50'>QuickCuisine</span>, your passport to culinary adventures! <br className='hidden sm:block' /> Discover a treasure trove of delectable recipes from around the globe</p>
            </div>
            <a href='#explore' className='absolute bottom-16 sm:bottom-14 md:bottom-12 left-1/2'><FaArrowCircleDown className='size-6 sm:size-7 md:size-8 lg:size-9 animate-bounce text-orange-200 opacity-60'/></a>
        </div>
    )
}

export default Header
