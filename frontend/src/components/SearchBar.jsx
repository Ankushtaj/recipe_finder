const Searchbar = ({ type, placeholder, required = false, value, name, handleInputChange, rightIcon, onClear }) => {
    return (
        <div className='relative group w-full'>
            <input
                type={type || "text"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                required={required}
                className='bg-black/80 backdrop-blur-sm border border-gray-700 text-gray-200 text-md rounded-full focus:ring-1 focus:ring-orange-300/20 focus:border-orange-300/50 block w-full p-2.5 px-5 pr-20 outline-none placeholder:text-gray-500 placeholder:text-sm shadow-xl shadow-black/20 transition-all duration-300 hover:border-gray-600 focus:bg-zinc-950 focus:shadow-[0_0_20px_rgba(251,146,60,0.12)]'
            />

            <div className='absolute inset-y-0 right-0 flex items-center gap-3 pr-4'>

                {
                    value && (
                        <button
                            type="button"
                            onClick={onClear}
                            className='text-gray-500 hover:text-orange-300 transition-colors duration-200 text-sm'
                            title="Clear search"
                        >
                            ✕
                        </button>
                    )
                }

                <div className='flex items-center justify-center text-orange-300/80 group-hover:text-orange-200 group-focus-within:text-orange-200 transition-colors duration-300'>
                    {rightIcon}
                </div>

            </div>
        </div>
    )
}

export default Searchbar