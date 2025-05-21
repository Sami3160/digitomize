import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import josnData from '../json/companyProblems.json'
import { MdDataArray } from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import { MdDynamicFeed } from "react-icons/md";
import { TbMathXDivideY2 } from "react-icons/tb";
import { BsStack } from "react-icons/bs";
import { TbBinaryTree } from "react-icons/tb";
import { PiGraph } from "react-icons/pi";
import { GiReceiveMoney } from "react-icons/gi";
import {
  FaProjectDiagram,      // graph
  FaTasks,               // tree
  FaCode,                // array
  FaLink,                // linked list
  FaLayerGroup,          // stack
  FaStream,              // queue
  FaSitemap,             // heap
  FaHashtag,             // hash
  FaQuoteLeft,           // string
  FaTh,                  // matrix
  FaSearch,              // search
  FaSort,                // sort
  FaMoneyBillWave,       // greedy
  FaMemory,              // dynamic programming
  FaCompressAlt          // divide and conquer
} from 'react-icons/fa';
export default function CompanyProblems() {
  const [selectedCompany, setSelectedCompany] = useState()
  const [searchParams] = useSearchParams()
  const [problemsData, setProblemsData] = useState({})
  const location = useLocation();
  const navigate=useNavigate()
  useEffect(() => {
    const company = searchParams.get('company')
    if (company) {
      setSelectedCompany(company)
    }else{
      navigate('/problems?company=google')
    }
    setProblemsData(josnData[company])
    // console.log(problemsData)
  }, [location.search, searchParams])
  return (
    <div className='h-80 w-full'>
      <div className="cards flex flex-wrap justify-center gap-3 ">
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

const iconMap = {
graph: <PiGraph size={20} />,
tree: <TbBinaryTree size={20} />,
array: <MdDataArray size={20} />,
linkedlist: <FaLink size={20} />,
stack: <BsStack size={20} />,
queue: <FaStream size={20} />,
heap: <FaSitemap size={20} />,
hash: <FaHashtag size={20} />,
string: <RiDoubleQuotesL size={20} />,
matrix: <FaTh size={20} />,
search: <FaSearch size={20} />,
sort: <FaSort size={20} />,
greedy: <GiReceiveMoney size={20} />,
"dynamic programming": <MdDynamicFeed size={20} />,
"divide and conquer": <TbMathXDivideY2 size={20} />,
};
function SmolCard({ name, amount }) {
  const title = name[0]?.toUpperCase() + name?.slice(1);

  return (
    <div className="flex  py-2 px-4 gap-4 justify-between max-w-fit text-white  bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] items-center  rounded-full border border-gray-800 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
      <div className="  ">{iconMap[name]}</div>
        <div className="w-full text-sm">{title}</div>
        <span className=" font-bold text-sm">{amount}</span>
    </div>
  );
}

const Table = ({ name, data }) => {

  // console.log(name, data)
  const diffMap = {
    "hard": "bg-red-500",
    "medium": "bg-yellow-500",
    "easy": "bg-green-500"
  }
  const logoMap = {
    "Leetcode": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png",
    "Codeforces": "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-codeforces-programming-competitions-and-contests-programming-community-logo-filled-tal-revivo.png",
    "GfG": "https://digitomize.com/assets/geeksforgeeks-1a83bb08.svg",
    "CodeChef": "https://digitomize.com/assets/codechef-f6a4f2da.svg",
    "HackerRank":"https://img.icons8.com/windows/32/hackerrank.png",
    "Coding Ninjas": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaGVYSWZNTQAqAAAACAAEAQYAAwAAAAEAAgAAARIAAwAAAAEAAQAAASgAAwAAAAEAAgAAh2kABAAAAAEAAAA+AAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABfoAMABAAAAAEAAABfAAAAAPfNbXAAAAP5SURBVHicvZZPaFxVFMa/79z73mTG2Fg0pLUmbWyTagJKERFDNYILbVpQDK0uBK1pElLcuNCFS8GNIKhV1CiKoCCNrQspKP6BqMWNEanFP4lJkyxKxGqNTSYz8969x0WccTKZxHTy5ywevPfuvd/vnXfuPR+xghjubWiRmLfR4GZV7BDySq9qSehK5pcLBRBSnrLLDOB4z/b7lOxV1TYbyCYhoAVJVqoNAvAAcuqvKQswfGTXdeMSvyDCTkMg8kDsK/7YpQDUAH4RwLm+7TfCxR8kLFsysSJeM9nyIcU3P/Y0bFXHgdCyZS7Wyn9wJQAKMFB5PmnZmok3QroEYKy74e7Q4NDcBooDQL4GqODjVmiWKzYCMEJI5RugsI4H6LyKBYDRnuvrAXdXzi0tHhoicorI+wkAUwSiVQKogH/MZ4DxHQkxNdklAEJDxE4/VeVzgfVDDa9O/kWsTY1aAFBFG5dIa8IQGafv+YTtaj72a3YtRBcAHD8IQ7C13K+3QmSdn/BR9onm/qk1FwcA217bkpyJ0tvKAQQCxA7vN7899TsA3PnA/iYNoswWX3N+YGDAXY7QLQcOpBLJqD4LNzU08Nl0AWA6l7tKiM1eFxIQQM4pFBjMP3PUI0YT3ed1dnxvZ8dPSj1rlL945fdfnzw1lh/X/kh7VTRTfauh360euyFsBX0TVFIphnsB/AfgJao2iqC0uZCAU42s6ET+mVG+6b3rCsJgD4A9AOCi+Izz2gdgrHi+QPcp5ckgGVhVBUDEUe7FrwY+Olc8zoZkQkuO5HwoGHnD2fz9lydPjdx+6N59jKI+gBbA54KZE9+cGJwpnjf4zmAGwNNtBzuOR7noQYI7Vd235or0S6UaHO1rvAmxnhZBdXEdCAGvSAu1tfH1ifFygGsRAkEG1EUFpQBUNfSxbFovcQCQbOQuQZFddAwoEBixavyudQWoQe20kn+y5CRSzG9DKO5ZV4Br+4fmAJ0s12ByTiFk58jRneuWBSGgBM6UA3AKhIZXS+zeGO1qrFsPAALASM/2+xMiH0ZLtOLQEDmvP8PzFSPui5j2QhjlVu3W6k3dJQLA8OEttRIkfrDCOufLDw7+9QHZ2GcVvEhqrlLhgiklHi0kfrR7x1vJgIf/zxEJ5xcoLdoKAKDOdxRcsad/ORPLQ0Ikl3PghXdauR0oyoAWjuCm/snvFHqsyq7Sb11mLOgBqXTmmXTkP0kFGwexAGDru7/NViHxcDqnH6csYTaAY1EX3NY/fOEis51zsT4L1b+TlrBCrKLmlo1llx3ubWgJIY95oEMVjVZYRWLVdjS/C7z6/Sv6rrNHW6pTcbrVAzcI0OCBzVS1lXJw/qLi8No/YzuoX35Hj9UAAAAASUVORK5CYII=",
  }
  const nm = name[0].toUpperCase() + name.slice(1)
  return (
    <div className="w-full my-3">
      <div className="shadow-lg rounded-lg overflow-hidden mx-2 md:mx-10">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed min-w-[500px] md:min-w-0">
            <thead>
              <tr className="bg-[#2C2C2C] text-white">
                <th className="py-4 px-4 md:px-6 text-sm text-left font-bold uppercase">{nm}</th>
                <th className="py-4 px-4 md:px-6 text-left font-bold uppercase"></th>
                <th className="py-4 px-4 md:px-6 text-left font-bold uppercase"></th>
                <th className="py-4 px-4 md:px-6 text-left font-bold uppercase"></th>
              </tr>
            </thead>
            <tbody className="bg-[#191919]">
              {
                data.map((val, index) => {
                  let difficulty;
                  let platform = "Leetcode"
                  if (val.link.includes("codeforces")) platform = "Codeforces"
                  if (val.link.includes("leetcode")) platform = "Leetcode"
                  if (val.link.includes("geeksforgeeks")) platform = "GfG"
                  if (val.link.includes("codingninjas")) platform = "Coding Ninjas"
                  if (val.link.includes("naukri")) platform = "Coding Ninjas"
                  if (val.link.includes("codechef")) platform = "CodeChef"
                  if (val.link.includes("hackerrank")) platform = "HackerRank"
                  if (val.title.length % 2 == 0) difficulty = "easy"
                  else if (val.title.length % 3 == 0) difficulty = "medium"
                  else difficulty = "hard"
                  return (
                    <tr key={index} className='text-white'>
                      <td className="py-2 px-4 md:px-6 border-b border-gray-700 break-words max-w-[150px] md:max-w-none">{val.title}</td>
                      <td className="py-2 px-4 md:px-6 border-b border-gray-700 ">
                        <span className='flex gap-2 md:gap-3 justify-center items-center'>
                          <img src={logoMap[platform]} alt="logo" className="w-6 h-6 rounded-full" />
                          <span className="hidden xs:inline">{platform}</span>
                        </span>
                      </td>
                      <td className="py-2 px-4 md:px-6 border-b border-gray-700 truncate text-center">
                        <span className={`${diffMap[difficulty]} text-white py-1 px-4 rounded-full text-xs`}>{difficulty}</span>
                      </td>
                      <td className="py-2 px-4 md:px-6 border-b border-gray-700">
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
    </div>
  )
}

const Start = ({ url }) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="relative group">
        <button
          className="relative inline-block p-px font-semibold leading-6 text-white bg-teal-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          onClick={() => window.open(url, '_blank')}
        >
          <span
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          ></span>

          <span className="relative z-10 block px-6 py-2 rounded-xl bg-gray-950">
            <div className="relative z-10 flex items-center space-x-2">
              <span className="transition-all duration-500 group-hover:translate-x-1"
              >
                Visit
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