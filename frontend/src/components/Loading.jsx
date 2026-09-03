import { RotatingLines } from "react-loader-spinner";

function Loader() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="rounded-full p-2 bg-orange-300/5 shadow-[0_0_28px_rgba(251,146,60,0.12)]">
                <RotatingLines
                    strokeColor="#fdba74"
                    strokeWidth="4"
                    animationDuration="0.8"
                    width="56"
                    visible={true}
                />
            </div>
        </div>
    );
}

export default Loader;