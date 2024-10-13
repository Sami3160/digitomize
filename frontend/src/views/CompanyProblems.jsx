import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
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
    // console.log(problemsData)
  }, [location.search, searchParams])
  return (
    <div className='h-80 w-full'>
      <div className="cards flex flex-wrap gap-3 ">
        {/* <SmolCard name={"graph"}  amount={4} /> */}
        {
          Object.keys(problemsData).map((val, index) => {
            // console.log(val);

            return <SmolCard key={index} name={val} amount={problemsData[val].length} />
          })
        }

        {
          Object.keys(problemsData).map((val, index) => {
            // console.log(val);

            return <Table key={index} name={val} data={problemsData[val]} />
          })
        }
      </div>
    </div>
  )
}

function SmolCard({ name, amount }) {
  const imageMap = {
    "graph": "https://img.icons8.com/ios/50/decentralized-network.png",
    "tree": "https://img.icons8.com/ios-filled/50/parallel-tasks.png",
    "array": "https://img.icons8.com/ios-filled/50/curly-brackets.png",
    "linkedlist": "https://img.icons8.com/material-rounded/24/connected-no-data.png",
    "stack": "https://img.icons8.com/sf-regular-filled/48/layers.png",
    "queue": "https://img.icons8.com/material-rounded/24/queue.png",
    "heap": "https://img.icons8.com/material-outlined/24/stacked-organizational-chart-highlighted-parent-node.png",
    "hash": "https://img.icons8.com/material-outlined/24/hashtag-2.png",
    "string": "https://img.icons8.com/material-rounded/24/quote-left.png",
    "matrix": "https://img.icons8.com/material-outlined/24/matrix-logo.png",
    "search": "https://img.icons8.com/material-outlined/24/google-web-search.png",
    "sort": "https://img.icons8.com/ios-filled/50/generic-sorting.png",
    "greedy": "https://img.icons8.com/ios-glyphs/30/money-bag.png",
    "dynamic programming": "https://img.icons8.com/ios-glyphs/30/smartphone-ram.png",
    "divide and conquer": "https://img.icons8.com/ios-glyphs/30/crown.png",
  }
  const n = name[0].toUpperCase() + name.slice(1)
  return (
    <div
      className="flex h-24 w-52   bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] 
      items-center justify-evenly rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
      <img src={imageMap[name]} alt="graph" className="w-14 h-14 text-white" />
      <div className="flex flex-row px-3 gap-2 items-center text-white justify-center">
        <div className="text-lg text-white">{n}</div>
        <span className="font-bold text-white text-xl"> {amount}</span>

      </div>

    </div>
  );
}


const Table = ({ name, data }) => {
  console.log(name, data)
  const diffMap = {
    "hard": "bg-red-500",
    "medium": "bg-yellow-500",
    "easy": "bg-green-500"
  }

  const nm = name[0].toUpperCase() + name.slice(1)
  return (
    <div className="w-full my-3">
      <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
        <table className="w-full table-fixed">
          <thead>

            <tr className="bg-[#2C2C2C] text-white">
              <th className="w-full py-4 px-6 text-left  font-bold uppercase">{nm}</th>
              <th className="w-1/2 py-4 px-6 text-left  font-bold uppercase"></th>
              <th className="w-1/3 py-4 px-6 text-left  font-bold uppercase"></th>
              <th className="w-1/2 py-4 px-6 text-left  font-bold uppercase"></th>
            </tr>
          </thead>
          <tbody className="bg-[#191919]">
            {
              data.map((val, index) => {
                let difficulty;
                if (val.title.length % 2 == 0) difficulty = "easy"
                else if (val.title.length % 3 == 0) difficulty = "medium"
                else difficulty = "hard"
                return (
                  <tr key={index} className='text-white'>
                    <td className="py-2 px-6 border-b border-gray-700">{val.title}</td>
                    <td className="py-2 px-6 border-b border-gray-700">Leetcode</td>
                    <td className="py-2 px-6 border-b border-gray-700 truncate">
                      <span className={`${diffMap[difficulty]} text-white py-1 px-2 rounded-full text-xs`}>{difficulty}</span>
                    </td>
                    <td className="py-2 px-6 border-b border-gray-700">
                      <Start url={val.link} />
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}

const Start = ({ url }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative group">
        <button
          className="relative inline-block p-px font-semibold leading-6 text-white bg-teal-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
        >
          <span
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></span>

          <span className="relative z-10 block px-6 py-2 rounded-xl bg-gray-950">
            <div className="relative z-10 flex items-center space-x-2">
              <span className="transition-all duration-500 group-hover:translate-x-1"
              >
                <Link to={url} target='blank'>Visit</Link>
              </span>
              <svg
                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
          </span>
        </button>
      </div>
    </div>

  )
}