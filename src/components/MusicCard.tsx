import Image from "next/image";
import DefaultImage from "../images/DefaultImage.jpg";
import { MusicCardProps } from "@/utils/types";

const activeStyle = "bg-gradient-to-r from-slate-950 to-violet-950 border-violet-950 border-[1px]";
const nonActiveStyle = "border-[#222735] [&_p]:text-gray-600 border-[2px]";

const MusicCard: React.FC<MusicCardProps> = ({ musicData, isPlaying, isGrid = false, onPlay }) => {

  return (
    <div
      onClick={onPlay}
      className={`text-white p-4 rounded-xl cursor-pointer 
        ${isGrid ? "h-fit" : "h-fit flex gap-5"}
        ${isPlaying ? activeStyle : nonActiveStyle}
      `}
    >
      <div className={`rounded-xl bg-white/[0.1] opacity-[0.4] overflow-hidden ${isGrid ? "w-full h-[180px]" : "w-[100px] h-[100px]"}`}>
        <Image src={musicData?.image ?? DefaultImage} alt="No Image_001" width={500} height={500} className="w-full h-full object-cover" />
      </div>

      <div className={`font-semibold ${isGrid ? "w-full mt-5 flex justify-between" : ""}`}>
        <h3 className={`text-lg line-clamp-1 ${isGrid ? "max-w-[70%]" : "mb-4 text-[22px]"}`}>{musicData?.name}</h3>
      </div>
    </div>
  );
}

export default MusicCard;
