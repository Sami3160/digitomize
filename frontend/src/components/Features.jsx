import React from 'react'

export default function Features() {
  return (
    <div className='px-20 my-10 text-white'>
    <div className='flex gap-20 my-32'>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Focus on design everything scales automatically</h1>
        <p className='text-lg'>Create freely on canvas, including in pixels, with a responsive editor that optimizes designs for every screen size.</p>
      </div>
      <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
      <img 
        src="https://res.cloudinary.com/diemfyvd7/image/upload/v1727778345/zogndacpcwntatc2upf9.jpg" 
        alt="Template 1" 
        className="w-full h-full object-cover object-left hover:scale-105 transition-all ease-in" 
      />
    </div>
    </div>

    <div className='flex gap-20 my-32'>
    <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
      <img 
        src="https://res.cloudinary.com/diemfyvd7/image/upload/v1727778343/dtzfgl8zv284kkb9wzem.jpg" 
        alt="Template 1" 
        className="w-full h-full object-cover hover:scale-105 transition-all ease-in" 
      />
     </div>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Design in minutes, publish sites in seconds.</h1>
        <p className='text-lg'>Turn your ideas into a real website quickly. Select from thousands of free and premium website templates and customize them as you see fit.</p>
      </div>
    </div>

    <div className='flex gap-20 my-32'>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Develop and sell your applications</h1>
        <p className='text-lg'>Use the Blocks workspace to build widgets and interactive components. And monetize them on our app market, with an audience of 245M+ potential customers.</p>
      </div>
      <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
        <img 
          src="https://res.cloudinary.com/diemfyvd7/image/upload/v1727778320/d6lehheeuvqryrayz6k1.jpg" 
          alt="Template 1" 
          className="w-full h-full object-cover hover:scale-105 transition-all ease-in" 
        />
      </div>
    </div>

    <div className='flex flex-col justify-center items-center text-center'> 
        <div className='w-2/5 '>
        <h className='text-3xl w-5/6 font-medium self-center'>Design a Toggl Website for free</h>
        <p className='mt-7 text-lg '>Design and launch a professional, one-of-a-kind website in minutes with Canva’s free website builder. Use free customizable templates, easy drag-and-drop tools, and unlimited content. No experience needed.</p>
        <button className='mt-7 bg-primary px-10 py-1 rounded border border-[#5eead4] text-white hover:bg-[#5eead4] hover:text-black font-medium active:scale-95 active:bg-primary transition-transform duration-150 ease-in-out'>Get started</button>
       </div>
    </div>
 </div>
  )
}
