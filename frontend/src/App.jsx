import { useEffect, useState } from 'react'
import './App.css'
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import HeroSection from './components/HeroSection'
import ExploreContests from './components/ExploreContests'
import Features from './components/Features'
// import BackgroundBeams from './components/ui/background'
function App() {
  useEffect(()=>{
    document.title = "Digitomize | Home"
  },[])
   return (
    <>
        <HeroSection/>
        <ExploreContests/>
        <Features/>
      {/* <ThreeDCardDemo/> */}
      {/* <BackgroundBeams/> */}
    </>
  )
}




export default App
