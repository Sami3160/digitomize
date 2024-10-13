import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThreeDCardDemo } from './test/card-effect'
// import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { IconHome , IconMessage, IconUser} from '@tabler/icons-react'
import Navbar from './test/navbar'
import HeroSection from './components/HeroSection'
// import BackgroundBeams from './components/ui/background'
function App() {
  useEffect(()=>{
    document.title = "Digitomize, Home"
  },[])
   return (
    <>
        <HeroSection/>
      {/* <ThreeDCardDemo/> */}
      {/* <BackgroundBeams/> */}
    </>
  )
}




export default App
