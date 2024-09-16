'use client'
import DashboardPage from '@/components/DashboardPage';
import LandingPage from '@/components/LandingPage';
import { useState } from 'react';


const HomePage = () => {

  /// State for Hide Landing Page
  const [showLandingPage, setShowLandingPage] = useState(true);
  
  /// To Navigate the Music Player Page
  const onGetStarted =()=>{
    setShowLandingPage(false)
  }

  return (
    <>
    {
      showLandingPage?
      <LandingPage onGetStarted={onGetStarted} />
      : 
      <DashboardPage />
    }
    </>
  )
}

export default HomePage
