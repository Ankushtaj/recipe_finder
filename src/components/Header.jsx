import React from 'react'
import Banner1 from "../assets/banner1.jpeg";
import Banner2 from "../assets/banner2.jpeg";
import Banner3 from "../assets/banner3.jpeg";
import Banner4 from "../assets/banner4.webp";
import Banner5 from "../assets/banner5.webp";
import mylogo from "../assets/mylogo.png";

const Header = () => {
    const arr=[Banner1,Banner2,Banner3,Banner4,Banner5]
    return (
        <div id='home' className='relative w-full h-[100vh] scroll-mt-16'>
            <img src={arr[Math.floor(Math.random()*arr.length)]} className='absolute w-full h-full object-cover'></img>
            <div className='absolute bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.9)_100%)] w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-[1.75rem] sm:text-4xl md:text-5xl font-serif font-semibold tracking-tighter sm:tracking-tight text-white pt-8 whitespace-nowrap'><span className='hover:text-orange-300 duration-300'>Find</span> ◦ <span className='hover:text-orange-300 duration-300'>Filter</span> ◦ <span className='hover:text-orange-300 duration-300'>Flavour</span></h1>
                <h1 className='text-[1rem] sm:text-xl md:text-2xl font-normal font-serif italic text-gray-200'>Type You Craving, Find Your Dish</h1>
                <p className='text-xs md:text-sm text-center font-normal text-orange-300 mt-4 tracking-widest bg-[#00000085] px-4 py-2 rounded-full'>Welcome to <span className='text-gray-50'>QuickCuisine</span>, your passport to culinary adventures! <br className='hidden sm:block' /> Discover a treasure trove of delectable recipes from around the globe</p>
            </div>
        </div>
    )
}

export default Header
