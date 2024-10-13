import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import josnData from '../json/companyProblems.json'
export default function CompanyProblems() {
  const [selectedCompany, setSelectedCompany] = useState()
  const [searchParams] = useSearchParams()
  const [problemsData, setProblemsData] = useState({})
  const location = useLocation();

  useEffect(() => {
    const company = searchParams.get('company')
    if (company) {
      setSelectedCompany(company)
    }
    setProblemsData(josnData[company])
    console.log(problemsData)
  }, [location.search, searchParams])
  return (
    <div className='h-80 w-full'>
      <div className="cards  ">
        <SmolCard name={"graph"}  amount={4} />
        
      </div>
    </div>
  )
}

function SmolCard({ name,  amount }) {
  const imageMap={
    "graph":"https://img.icons8.com/ios/50/decentralized-network.png",
    "tree":"https://img.icons8.com/ios-filled/50/parallel-tasks.png" ,
    "array":"https://img.icons8.com/ios-filled/50/curly-brackets.png",
    "linkedlist":"https://img.icons8.com/material-rounded/24/connected-no-data.png",
    "stack":"https://img.icons8.com/sf-regular-filled/48/layers.png",
    "queue":"https://img.icons8.com/material-rounded/24/queue.png",
    "heap":"https://img.icons8.com/material-outlined/24/stacked-organizational-chart-highlighted-parent-node.png",
    "hash":"https://img.icons8.com/material-outlined/24/hashtag-2.png",
    "string":"https://img.icons8.com/material-rounded/24/quote-left.png",
    "matrix":"https://img.icons8.com/material-outlined/24/matrix-logo.png",
    "search":"https://img.icons8.com/material-outlined/24/google-web-search.png",
    "sort":"https://img.icons8.com/ios-filled/50/generic-sorting.png",
    "greedy":"https://img.icons8.com/ios-glyphs/30/money-bag.png",
    "dynamic programming":"https://img.icons8.com/ios-glyphs/30/smartphone-ram.png",
    "divide and conquer":"https://img.icons8.com/ios-glyphs/30/crown.png",
  }
  const n=name[0].toUpperCase()+name.slice(1)
  return (
    <div 
      className="flex h-24 w-48   bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] 
      items-center justify-evenly rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
        <img src={imageMap[name]} alt="graph" className="w-14 h-14 text-white" />
      <div className="flex flex-row gap-2 items-center text-white justify-center">
      <div className="text-lg text-white">{n}</div>
        <span className="font-bold text-white text-xl"> {amount}</span>

      </div>

    </div>
  );
}
