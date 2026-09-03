import { useEffect, useState } from 'react'
import Banner1 from "../assets/banner1.jpeg";
import Banner2 from "../assets/banner2.jpeg";
import Banner3 from "../assets/banner3.jpeg";
import Banner4 from "../assets/banner4.webp";
import Banner5 from "../assets/banner5.webp";
import { FaArrowCircleDown } from "react-icons/fa";

const Header = () => {
    const arr = [Banner1, Banner2, Banner3, Banner4, Banner5]

    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % arr.length)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div id='home' className='relative w-full h-[100vh] min-h-[620px] max-h-[1100px] overflow-hidden scroll-mt-16'>

            {arr.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3500ms] ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.28)_28%,rgba(0,0,0,0.58)_62%,rgba(0,0,0,0.94)_100%)]' />

            <div className='absolute inset-0 flex flex-col justify-center items-center text-center px-5 sm:px-8 md:px-12 pt-10 sm:pt-12'>

                <div className='max-w-5xl w-full flex flex-col items-center'>

                    <p className='text-[10px] sm:text-xs md:text-sm tracking-[0.32em] sm:tracking-[0.38em] uppercase text-orange-300/90 mb-4 sm:mb-5 font-semibold font-serif'>
                        Gather • Cook • Grow
                    </p>

                    <h1 className='text-[clamp(1.9rem,7vw,4.5rem)] leading-[1.05] font-serif font-semibold tracking-[-0.04em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.55)] whitespace-nowrap'>
                        <span className='transition-colors duration-300 hover:text-orange-200'>
                            Search
                        </span>
                        <span className='mx-1.5 sm:mx-2 md:mx-3 text-orange-300/80'>
                            ◦
                        </span>
                        <span className='transition-colors duration-300 hover:text-orange-200'>
                            Share
                        </span>
                        <span className='mx-1.5 sm:mx-2 md:mx-3 text-orange-300/80'>
                            ◦
                        </span>
                        <span className='transition-colors duration-300 hover:text-orange-200'>
                            Savour
                        </span>
                    </h1>

                    <div className='h-[1.5px] w-16 sm:w-20 md:w-24 bg-linear-to-r from-transparent via-orange-300/90 to-transparent mt-5 sm:mt-6 mb-4 sm:mb-5' />

                    <h2 className='text-[clamp(1rem,3.8vw,1.65rem)] leading-tight font-serif italic font-normal tracking-wide text-gray-100/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]'>
                        Type Your Craving, Find Your Dish
                    </h2>

                    <div className='mt-5 sm:mt-6 max-w-[min(92vw,720px)] rounded-2xl border border-white/10 bg-black/35 backdrop-blur-[3px] px-5 py-3.5 sm:px-7 sm:py-4 shadow-[0_8px_35px_rgba(0,0,0,0.22)]'>
                        <p className='text-[11px] sm:text-xs md:text-sm lg:text-[15px] leading-6 sm:leading-7 tracking-[0.08em] sm:tracking-[0.12em] text-orange-200/90'>
                            Welcome to{" "}
                            <span className='text-slate-200 font-semibold tracking-normal'>
                                QuickCuisine
                            </span>
                            {" — your passport to culinary adventures."}
                            <span className='hidden sm:inline'> Discover new recipes, master your kitchen and inspire others.</span>
                        </p>
                    </div>

                </div>

            </div>

            <div className='absolute bottom-5 sm:bottom-7 md:bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>

                <span className='hidden sm:block text-[9px] md:text-[10px] uppercase tracking-[0.28em] text-orange-100/60 mb-2'>
                    Explore
                </span>

                <a href='#explore'>
                    <FaArrowCircleDown className='size-6 sm:size-7 md:size-8 text-orange-200/70 group-hover:text-orange-200 transition-all duration-300 animate-bounce' />
                </a>

            </div>

        </div>
    )
}

export default Header