import { useState } from 'react'
import Logo from '../assets/mylogo.png'
import { HiMenuAlt3 } from 'react-icons/hi'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const goHome = () => {
        setOpen(false)
        setShow(false)
        navigate("/")
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    const goExplore = () => {
        setOpen(false)
        setShow(false)
        navigate("/")
        setTimeout(() => {
            document.getElementById("explore")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 100)
    }

    const goFollow = () => {
        setOpen(false)
        setShow(false)
        navigate("/")
        setTimeout(() => {
            document.getElementById("follow")?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }, 100)
    }

    const handleLogout = async () => {
        try {
            await logout()
            setShow(false)
            setOpen(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='w-full fixed z-10 bg-black/75 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'>
            <nav className='relative flex w-full py-2 px-4 sm:py-3 md:px-10 lg:px-14 items-center justify-between'>

                <button
                    onClick={goHome}
                    className='flex items-center justify-center gap-2 cursor-pointer group'
                >
                    <img
                        src={Logo}
                        className='hidden sm:block w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 ml-2 drop-shadow-[0_0_8px_rgba(251,146,60,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(251,146,60,0.5)]'
                    />

                    <div className='relative text-xl sm:text-2xl md:text-3xl font-semibold font-serif tracking-tight bg-gradient-to-r from-gray-100 via-amber-100 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:from-white group-hover:via-orange-100 group-hover:to-orange-400'>
                        Quick<span className='italic'>Cuisine</span>
                    </div>
                </button>

                <ul className='hidden lg:flex text-gray-300 gap-7 items-center font-medium tracking-wide'>

                    <li className='hover:text-orange-300 duration-300 transition-all'>
                        <button
                            onClick={goHome}
                            className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-orange-300 after:transition-all after:duration-300 hover:after:w-full'
                        >
                            Home
                        </button>
                    </li>

                    <li className='hover:text-orange-300 duration-300 transition-all'>
                        <button
                            onClick={goExplore}
                            className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-orange-300 after:transition-all after:duration-300 hover:after:w-full'
                        >
                            Explore
                        </button>
                    </li>

                    <li className='hover:text-orange-300 duration-300 transition-all'>
                        <Link
                            to="/community"
                            className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-orange-300 after:transition-all after:duration-300 hover:after:w-full'
                        >
                            Community
                        </Link>
                    </li>

                    <li className='hover:text-orange-300 duration-300 transition-all'>
                        <button
                            onClick={goFollow}
                            className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-orange-300 after:transition-all after:duration-300 hover:after:w-full'
                        >
                            Follow Us
                        </button>
                    </li>

                    {
                        user ? (
                            <li className='relative'>

                                <button
                                    onClick={() => setShow(!show)}
                                    className='text-gray-300 hover:text-orange-300 duration-300 transition-all flex items-center gap-1'
                                >
                                    <span className='flex items-center justify-center rounded-full border border-orange-300/40 bg-orange-300/5 p-1.5'>
                                        <AiOutlineUser className='text-lg' />
                                    </span>

                                    <span className='text-sm font-medium'>
                                        {user?.name || user?.userId?.name || "Account"}
                                    </span>
                                </button>

                                {
                                    show && (
                                        <div className='absolute right-0 mt-4 w-32 bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden'>

                                            <Link
                                                to="/favourites"
                                                onClick={() => setShow(false)}
                                                className='block px-4 py-3 text-sm text-gray-300 hover:text-orange-300 hover:bg-orange-300/5 duration-300 transition-all'
                                            >
                                                Favourites
                                            </Link>

                                            <Link
                                                to="/search-history"
                                                onClick={() => setShow(false)}
                                                className='block px-4 py-3 text-sm text-gray-300 hover:text-orange-300 hover:bg-orange-300/5 duration-300 transition-all'
                                            >
                                                Recents
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-red-300 hover:bg-red-400/5 duration-300 transition-all'
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )
                                }

                            </li>
                        ) : (
                            <li className='hover:text-orange-300 duration-300 transition-all'>
                                <Link
                                    to="/login"
                                    className='relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-orange-300 after:transition-all after:duration-300 hover:after:w-full'
                                >
                                    Login
                                </Link>
                            </li>
                        )
                    }

                </ul>

                <div className='lg:hidden flex items-center gap-4'>

                    {
                        user && (
                            <div className='relative'>

                                <button
                                    onClick={() => setShow(!show)}
                                    className='text-gray-300 hover:text-orange-300 transition-all duration-300'
                                >
                                    <AiOutlineUser className='text-xl' />
                                </button>

                                {
                                    show && (
                                        <div className='absolute right-0 mt-3 w-32 bg-zinc-950/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl shadow-black/40 overflow-hidden'>

                                            <Link
                                                to="/favourites"
                                                onClick={() => setShow(false)}
                                                className='block px-4 py-3 text-sm text-gray-300 hover:text-orange-300 hover:bg-orange-300/5 duration-300 transition-all'
                                            >
                                                Favourites
                                            </Link>

                                            <Link
                                                to="/search-history"
                                                onClick={() => setShow(false)}
                                                className='block px-4 py-3 text-sm text-gray-300 hover:text-orange-300 hover:bg-orange-300/5 duration-300 transition-all'
                                            >
                                                Recents
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className='w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-red-300 hover:bg-red-400/5 duration-300 transition-all'
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )
                                }

                            </div>
                        )
                    }

                    <button
                        className='text-gray-300 hover:text-orange-300 text-xl transition-all duration-300'
                        onClick={() => setOpen(!open)}
                    >
                        {
                            open
                                ? <AiOutlineClose />
                                : <HiMenuAlt3 />
                        }
                    </button>

                </div>

            </nav>

            <div className={`${open ? "flex" : "hidden"} lg:hidden bg-zinc-950/95 backdrop-blur-md border-t border-white/10 flex-col w-full px-4 py-6 text-gray-300 gap-6 text-[14px] font-medium tracking-wide shadow-2xl shadow-black/30`}>

                <button
                    onClick={goHome}
                    className='text-left hover:text-orange-300 duration-300 transition-all'
                >
                    Home
                </button>

                <button
                    onClick={goExplore}
                    className='text-left hover:text-orange-300 duration-300 transition-all'
                >
                    Explore
                </button>

                <Link
                    to="/community"
                    className='hover:text-orange-300 duration-300 transition-all'
                    onClick={() => setOpen(false)}
                >
                    Community
                </Link>

                <button
                    onClick={goFollow}
                    className='text-left hover:text-orange-300 duration-300 transition-all'
                >
                    Follow Us
                </button>

                {
                    !user && (
                        <>
                            <Link
                                to="/login"
                                className='hover:text-orange-300 duration-300 transition-all'
                                onClick={() => setOpen(false)}
                            >
                                Login
                            </Link>
                        </>
                    )
                }

            </div>

        </div>
    )
}

export default Navbar