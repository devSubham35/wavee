'use client'
import React, { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import Navbar from './Navbar';
import MusicCard from './MusicCard';
import PogressBar from './PogressBar';
import UploadForm from './UploadForm';
import DefaultImage from "../images/DefaultImage.jpg";

const DashboardPage = () => {
  
  const [isGrid, setIsGrid] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [musicData, setMusicData]: any = useState([]);
  const [currentTrack, setCurrentTrack]: any = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef: any = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleNext);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (currentTrack) {
      audio.src = currentTrack.music;
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  const handleToggle = () => setIsGrid(!isGrid);

  const handleUploadForm = (formData: any) => {
    console.log(formData, "++66")
    const newSong = {
      name: formData?.title,
      duration: "0:00",
      image: formData?.image ? URL.createObjectURL(formData.image) : DefaultImage,
      music: URL.createObjectURL(formData.music)
    };
    setMusicData((prevData: any) => [...prevData, newSong]);
    setShowModal(false);
  };

  const handlePlay = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (musicData.length === 0) return;

    const currentIndex = musicData.findIndex((track: any) => track === currentTrack);
    if (musicData.length === 1) {
      // Single song, loop it
      audioRef.current.currentTime = 0;
      if (!isPlaying) audioRef.current.play();
    } else {
      // Multiple songs
      const nextTrack = musicData[(currentIndex + 1) % musicData.length];
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (musicData.length === 0) return;

    const currentIndex = musicData.findIndex((track: any) => track === currentTrack);
    const prevTrack = musicData[(currentIndex - 1 + musicData.length) % musicData.length];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  const updateProgress = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  return (
    <div className='w-full h-screen overflow-hidden bg-gradient-to-br from-black via-[rgb(18,14,37)] to-[rgb(18,14,37)] p-10'>
      <Navbar
        isGrid={isGrid}
        handleToggle={handleToggle}
        onUpload={() => setShowModal(true)}
      />

      <div className='w-full mt-[15px] flex flex-col justify-between gap-8' style={{ height: "calc(100vh - 155px)" }}>
        <div className={`w-full h-[85%] gap-4 xl:gap-6 overflow-y-scroll hide-scroll 
          ${musicData.length > 0 && isGrid ? "grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" : "flex flex-col"}`}>
          {
            musicData.length > 0 ?
              musicData.map((item: any, index: number) => (
                <MusicCard
                  key={index}
                  musicData={item}
                  isPlaying={item === currentTrack && isPlaying}
                  isGrid={isGrid}
                  onPlay={() => handlePlay(item)}
                />
              ))
              :
              <div className='w-full h-full flex justify-center items-center pt-20 text-[40px] font-bold text-white/[0.2]'>Please Upload Some Music & Enjoy</div>
          }
        </div>

        {/* Progress Bar */}
        <div className='w-full h-[15%]'>
          {currentTrack && (
            <PogressBar
              currentTrack={currentTrack}
              currentTime={currentTime}
              audioRef={audioRef}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              handlePlay={handlePlay}
              handlePause={handlePause}
              isPlaying={isPlaying}
            />
          )}
        </div>
      </div>

      {/* Upload Form Modal */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <UploadForm onDataUpload={handleUploadForm} setShowModal={setShowModal} />
      </Modal>
    </div>
  );
};

export default DashboardPage;
