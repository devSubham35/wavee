import { LandingPageProps } from "@/utils/types";
import { IoArrowForward } from "react-icons/io5";


const LandingPage = ({ onGetStarted }: LandingPageProps) => {
    return (
        <>
            <div onClick={onGetStarted} className='z-0 relative w-full h-full bg-secondary text-white'>

                <div className="[&_h1]:z-20 [&_p]:z-20 [&_button]:z-20 w-full h-full flex flex-col justify-center items-center p-10">
                    <h1 className='font-bold text-[20vw] xl:text-[20rem] leading-[140px] lg:leading-[180px] xl:leading-[250px] mb-4'>WAVEE</h1>
                    <p className='font-medium text-[4vw] xl:text-[3rem] text-gray-500 mb-6'>Your one touch Music Player</p>
                    <button type="button" className='w-fit px-8 py-3 rounded-full bg-white text-slate-700 font-semibold 
                    flex items-center gap-2 active:scale-[0.9] duration-500 cursor-pointer'>
                        Get started <IoArrowForward />
                    </button>
                </div>

                <div className="z-10 w-full h-full absolute top-0 left-0 flex justify-center items-center">
                    <div className="-z-10 w-[500px] h-[480px] bg-blue-500 rounded-full blur-2xl opacity-20 animate-spin"></div>
                </div>
            </div>
        </>
    )
}

export default LandingPage
