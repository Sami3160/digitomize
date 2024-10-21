import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CompanyProblems from './CompanyProblems'
export default function ProblemsPage() {
    const [selectedCompany, setSelectedCompany] = useState()
    const [searchParams] = useSearchParams()
    const location = useLocation();
    useEffect(()=>{
        document.title = "Digitomize | Problems"
    },[])
    useEffect(() => {
        const company = searchParams.get('company')
        if (company) {
            setSelectedCompany(company)
        }
        // console.log(location)
    }, [location.search, searchParams])
    return (
        <div className='w-[80vw]  mt-40  rounded-2xl mx-auto'>

            <div className="text-center flex flex-col gap-4 p-20 pt-10">

                <p className='text-7xl text-white font-extrabold'>Top companies</p>
                <p className='text-2xl text-white'>And their frequently asked questions</p>

                <div className="companies grid grid-rows-3 gap-4 text-white text-lg mt-10 text-start font-medium ">
                    <div className=" flex  justify-evenly">
                        <Link to="/problems?company=google" className='p-2 px-12 rounded-md bg-yellow-300 hover:bg-yellow-400 border border-slate-100 transition-bg duration-300'>Google</Link>
                        <Link to="/problems?company=flipkart" className='p-2 px-12 rounded-md bg-blue-500 hover:bg-blue-600 border border-slate-100 transition-bg duration-300'>Flipkart</Link>
                        <Link to="/problems?company=uber" className='p-2 px-12 rounded-md bg-black hover:bg-slate-100 border hover:text-black border-slate-100 transition-bg duration-300'>Uber</Link>
                        <Link to="/problems?company=amazon" className='p-2 px-12 rounded-md bg-yellow-400 hover:bg-yellow-500 border border-slate-100 transition-bg duration-300'>Amazon</Link>
                        <Link to="/problems?company=apple" className='p-2 px-12 rounded-md bg-slate-300 text-gray-600 hover:bg-slate-600 hover:text-white border border-slate-100 transition-bg duration-300'>Apple</Link>
                    </div>

                    <div className=" flex  justify-evenly">
                        <Link to="/problems?company=meta" className='p-2 px-12 rounded-md bg-blue-300 hover:bg-blue-400 border border-slate-100 transition-bg duration-300'>Meta</Link>
                        <Link to="/problems?company=oracle" className='p-2 px-12 rounded-md bg-orange-400 hover:bg-orange-700 border border-slate-100 transition-bg duration-300'>Oracle</Link>
                        <Link to="/problems?company=ibm" className='p-2 px-12 rounded-md bg-blue-700 hover:bg-blue-900 border border-slate-100 transition-bg duration-300'>IBM</Link>
                    </div>
                    <div className=" flex  justify-evenly">
                        <Link to="/problems?company=tcs" className='p-2 px-12 rounded-md bg-purple-500 hover:bg-purple-700 border border-slate-100 transition-bg duration-300'>TCS</Link>
                        <Link to="/problems?company=adobe" className='p-2 px-12 rounded-md bg-red-400 hover:bg-red-600 border border-slate-100 transition-bg duration-300'>Adobe</Link>
                        <Link to="/problems?company=nvidia" className='p-2 px-12 rounded-md bg-green-400 hover:bg-green-600 border border-slate-100 transition-bg duration-300'>Nvidia</Link>
                        <Link to="/problems?company=snap" className='p-2 px-12 rounded-md bg-yellow-300 hover:bg-yellow-500 border border-slate-100 transition-bg duration-300'>Snap</Link>
                    </div>
                </div>
            </div>
            <CompanyProblems/>
        </div>
    )
}
