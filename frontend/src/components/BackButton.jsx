import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ text = "Back", fallback = "/" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        }
        else {
            navigate(fallback);
        }
    };

    return (
        <button
            onClick={handleBack}
            className="w-[60px] sm:w-[70px] md:w-[80px] h-9 sm:h-10 flex items-center justify-center gap-1 bg-slate-900/80  border border-white/10 hover:border-orange-300/30 rounded-lg text-gray-200/50 hover:text-orange-200 text-sm font-medium shadow-lg shadow-black/20 transition-all duration-300"
        >
            <FaArrowLeft className="text-xs shrink-0" />
            <span className="truncate">
                {text}
            </span>
        </button>
    );
};

export default BackButton;
