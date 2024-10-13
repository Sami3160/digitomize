import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'

export default function ProblemsPage() {
    const [selectedCompany, setSelectedCompany] = useState()
    const [searchParams] = useSearchParams()
    const location = useLocation();
    useEffect(() => {
        const company = searchParams.get('company')
        if (company) {
            setSelectedCompany(company)
        }
        console.log(location)
    }, [location.search, searchParams])
    return (
        <div className='w-[80vw] h-[80vw] mt-40 bg-black rounded-2xl mx-auto'>

            <div className="text-center flex flex-col gap-4 p-20 pt-10">

                <p className='text-7xl text-white font-extrabold'>Top companies</p>
                <p className='text-2xl text-white'>And their frequently asked questions</p>

                <div className="companies grid grid-rows-3 gap-4 text-white text-lg mt-10 text-start font-medium ">
                    <div className=" flex  justify-evenly">
                        <a href="/problems?company=google" className='p-2 px-4 rounded-md bg-yellow-300 hover:bg-yellow-400 border border-slate-100 transition-bg duration-300'>Google</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-blue-500 hover:bg-blue-600 border border-slate-100 transition-bg duration-300'>Flipkart</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-black hover:bg-slate-100 border hover:text-black border-slate-100 transition-bg duration-300'>Uber</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-yellow-400 hover:bg-yellow-500 border border-slate-100 transition-bg duration-300'>Amazon</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-slate-300 text-gray-600 hover:bg-slate-600 hover:text-white border border-slate-100 transition-bg duration-300'>Apple</a>
                    </div>

                    <div className=" flex  justify-evenly">
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-blue-300 hover:bg-blue-400 border border-slate-100 transition-bg duration-300'>Meta</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-orange-400 hover:bg-orange-700 border border-slate-100 transition-bg duration-300'>Oracle</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-blue-700 hover:bg-blue-900 border border-slate-100 transition-bg duration-300'>IBM</a>
                    </div>
                    <div className=" flex  justify-evenly">
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-purple-500 hover:bg-purple-700 border border-slate-100 transition-bg duration-300'>TCS</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-red-400 hover:bg-red-600 border border-slate-100 transition-bg duration-300'>Adobe</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-green-400 hover:bg-green-600 border border-slate-100 transition-bg duration-300'>Nvidia</a>
                        <a href="/problems?company=google" className='p-2 px-8 rounded-md bg-yellow-300 hover:bg-yellow-500 border border-slate-100 transition-bg duration-300'>Snap</a>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
