import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id="follow" className="text-white bg-[#080b0f] border-t border-white/10 scroll-mt-16">

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">

                    <div className="flex flex-col gap-3">

                        <p className="font-serif font-semibold text-2xl tracking-tight bg-linear-to-r from-gray-100 via-amber-100 to-orange-300 bg-clip-text text-transparent">
                            Quick<span className="italic">Cuisine</span>
                        </p>

                        <p className="text-gray-400/80 text-sm leading-6 max-w-xs">
                            Discover recipes, explore flavours, and share your creations with the QuickCuisine community.
                        </p>

                    </div>

                    <div>

                        <p className="text-orange-200/90 text-sm font-semibold uppercase mb-4">
                            Quick Links
                        </p>

                        <div className="flex flex-col gap-2.5 text-sm text-gray-400">

                            <a
                                href="#"
                                className="hover:text-orange-300 transition-colors duration-200 w-fit"
                            >
                                Home
                            </a>

                            <a
                                href='#explore'
                                className="hover:text-orange-300 transition-colors duration-200 w-fit"
                            >
                                Explore
                            </a>

                            <Link
                                to="/community"
                                className="hover:text-orange-300 transition-colors duration-200 w-fit"
                            >
                                Community
                            </Link>

                            <Link
                                to="/favourites"
                                className="hover:text-orange-300 transition-colors duration-200 w-fit"
                            >
                                Favourites
                            </Link>

                        </div>

                    </div>

                    <div>

                        <p className="text-orange-200/90 text-sm font-semibold uppercase mb-4">
                            Follow Us
                        </p>

                        <div className="flex items-center gap-3">

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-orange-100/30 text-gray-400 hover:text-orange-200 hover:border-orange-300/30 hover:bg-orange-300/5 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaFacebook size={16} />
                            </a>

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-orange-100/30 text-gray-400 hover:text-orange-200 hover:border-orange-300/30 hover:bg-orange-300/5 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaInstagram size={16} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/ankush-das-79491539a"
                                aria-label="Linkedin"
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-orange-100/30 text-gray-400 hover:text-orange-200 hover:border-orange-300/30 hover:bg-orange-300/5 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaLinkedin size={16} />
                            </a>

                            <a
                                href="#"
                                aria-label="YouTube"
                                className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-orange-100/30 text-gray-400 hover:text-orange-200 hover:border-orange-300/30 hover:bg-orange-300/5 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaYoutube size={16} />
                            </a>

                        </div>

                    </div>

                </div>

                <div className="mt-10 pt-5 border-t border-white/20 flex justify-center">

                    <span className="text-xs sm:text-sm text-gray-400/60 text-center">
                        © 2026 • Designed & Developed by Ankush
                    </span>

                </div>

            </div>

        </footer>
    )
}

export default Footer