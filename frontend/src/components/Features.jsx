import React from 'react'

export default function Features() {
  return (
    <div className='px-20 my-10 text-white'>
    <div className='flex gap-20 my-32'>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Unlock Your Coding Potential with Digitomize</h1>
        <p className='text-lg'>Digitomize offers a powerful platform for coders of all levels. Whether you’re starting your journey or aiming to compete globally, we provide all the tools you need to elevate your skills and stand out in the competitive coding world.</p>
      </div>
      <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
        <img 
          src="https://res.cloudinary.com/dan454ywo/image/upload/v1731447212/csrtsodtzshnisx7ugcq.jpg" 
          alt="Template 1" 
          className="w-full h-full object-cover object-left hover:scale-105 transition-all ease-in" 
        />
      </div>
    </div>

    <div className='flex gap-20 my-32'>
      <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
        <img 
          src="https://res.cloudinary.com/dan454ywo/image/upload/v1731447376/bflahmei4ywtrddg3yns.jpg" 
          alt="Template 1" 
          className="w-full h-full object-cover hover:scale-105 transition-all ease-in" 
        />
      </div>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Compete in Coding Contests</h1>
        <p className='text-lg'>Get access to curated coding contests from leading platforms like LeetCode, Codeforces, and CodeChef. Track leaderboards, participate in skill-based challenges, and sharpen your competitive edge.</p>
      </div>
    </div>

    <div className='flex gap-20 my-32'>
      <div className='w-1/2 flex flex-col justify-center items-start p-5 '>
        <h1 className='text-3xl w-5/6 font-medium my-2'>Prepare with Top DSA Questions</h1>
        <p className='text-lg'>Digitomize provides a platform with a curated list of top Data Structures and Algorithms (DSA) questions frequently asked by leading tech companies. Improve your problem-solving skills and get ready for technical interviews.</p>
      </div>
      <div className='w-1/2 h-96 border border-slate-400 rounded-lg overflow-hidden'>
        <img 
          src="https://res.cloudinary.com/dan454ywo/image/upload/v1731447601/yufvlbyez8qcpfgzcsuf.avif" 
          alt="Template 1" 
          className="w-full h-full object-cover hover:scale-105 transition-all ease-in" 
        />
      </div>
    </div>

    <div className='flex flex-col justify-center items-center text-center'> 
      <div className='w-2/5 '>
        <h className='text-3xl w-5/6 font-medium self-center'>Start Your Coding Journey with Digitomize</h>
        <p className='mt-7 text-lg '>With Digitomize, you'll have access to all the resources you need to level up your coding skills. From coding contests to DSA question banks, we make it easier for you to achieve coding success.</p>
        <button className='mt-7 bg-primary px-10 py-1 rounded border border-[#5eead4] text-white hover:bg-[#5eead4] hover:text-black font-medium active:scale-95 active:bg-primary transition-transform duration-150 ease-in-out'>Get started</button>
      </div>
    </div>
 </div>
  )
}
