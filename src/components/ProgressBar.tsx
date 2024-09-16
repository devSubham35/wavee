import React from 'react';
import Image from 'next/image';
import DefaultImage from "../images/DefaultImage.jpg";
import { formatTime } from '@/utils/UtilsFunctions';
import { PiPauseFill, PiPlayFill, PiSkipBackFill, PiSkipForwardFill } from 'react-icons/pi';
import { MusicTrack } from '@/utils/types';


interface ProgressBarProps {
  currentTrack: MusicTrack;
  currentTime: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  handlePrevious: () => void;
  handleNext: () => void;
  handlePlay: (track: MusicTrack) => void;
  handlePause: () => void;
  isPlaying: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTrack,
  currentTime,
  audioRef,
  handlePrevious,
  handleNext,
  handlePlay,
  handlePause,
  isPlaying
}) => {
  return (
    <div>
      {currentTrack && (
        <div className='w-full h-[15%] p-4 flex items-center gap-6 justify-between bg-gradient-to-r from-slate-950 to-violet-950 rounded-full px-8'>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden'>
              <Image src={currentTrack.image ?? DefaultImage} alt={"image_00"} width={500} height={500} className="w-full h-full spin duration-1000" />
            </div>
            <div className='w-[150px] text-white font-semibold'>
              <h3 className="truncate mb-1">{currentTrack.name}</h3>
              <h3 className="text-gray-600 text-[14px]">{formatTime(audioRef.current?.duration || 0)}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handlePrevious}><PiSkipBackFill className="text-2xl text-white" /></button>
            {isPlaying ? (
              <button onClick={handlePause}><PiPauseFill className="text-3xl text-white" /></button>
            ) : (
              <button onClick={() => currentTrack && handlePlay(currentTrack)}><PiPlayFill className="text-3xl text-white" /></button>
            )}
            <button onClick={handleNext}><PiSkipForwardFill className="text-2xl text-white" /></button>
          </div>
          <div className="flex-1 mx-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 cursor-pointer">
              <div className="bg-violet-600 h-2.5 rounded-full cursor-pointer" style={{ width: `${(currentTime / (audioRef.current?.duration || 1)) * 100}%` }}></div>
            </div>
          </div>
          <p className="text-gray-300 text-sm">{formatTime(currentTime)} / {formatTime(audioRef.current?.duration || 0)}</p>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
