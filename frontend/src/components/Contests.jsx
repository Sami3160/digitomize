import { useEffect, useState } from 'react';
import ContestCard, { BentoGrid } from './ContestCard';
import axios from 'axios'
import { useAsyncError } from 'react-router-dom';
const Contests = () => {
   const [duration, setDuration] = useState(50);
   const [codeforcesContests, setCodeforcesContests] = useState();
   const [codechefContests, setCodechefContests] = useState();
   const [leetcodeContests, setLeetcodeContests] = useState();
   const [selectedPlatform, setSelectedPlatform] = useState('all')
   useEffect(() => {
      fetchUpcomingCodeforcesContests()
   }, [])
   async function fetchUpcomingCodeforcesContests() {
      try {
         //get codeforces contests
         const response = await axios.get('https://codeforces.com/api/contest.list?gym=false');
         const contests = response.data.result.filter(contest => contest.phase === 'BEFORE'); // Filter upcoming contests
         setCodeforcesContests(contests)
      } catch (error) {
         console.error('Error fetching contests:', error.message);
      }

      //get leetcode contest
      try {
         const response = await axios.get('http://localhost:5000/api/contests/leetcode-contests');
         console.log(response.data.contests)
         setLeetcodeContests(response.data.contests)
      } catch (error) {
         console.log(error);

      }
   }

   const handleChange = (e) => {
      if (!e.target.value) {
         setSelectedPlatform('all')
      } else {
         setSelectedPlatform(e.target.value)
      }
      // alert(selectedPlatform)
   }

   return (
      <div className="flex flex-col justify-center items-center gap-8">
         <div className=" text-center pt-44 flex flex-col gap-10">
            <p className="text-white text-7xl font-bold ">All at <span className="rounded-md bg-blue-500 px-4">one</span> place</p>
            <div className="flex items-center justify-center gap-4">
               <button className="border py-2 px-4 rounded-md text-slate-300 font-semibold flex gap-2 items-center">Contests <svg className="w-8" focusable="false" aria-hidden="true" fill="white" viewBox="0 0 24 24" data-testid="TrendingUpIcon"><path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg></button>

               <button className="border px-4 py-3 rounded-md text-slate-300 font-semibold flex gap-2 items-center">Challenges <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-swords "><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline><line x1="13" x2="19" y1="19" y2="13"></line><line x1="16" x2="20" y1="16" y2="20"></line><line x1="19" x2="21" y1="21" y2="19"></line><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline><line x1="5" x2="9" y1="14" y2="18"></line><line x1="7" x2="4" y1="17" y2="20"></line><line x1="3" x2="5" y1="19" y2="21"></line></svg><span className="bg-yellow-500 text-black rounded-full px-[10px] text-center">new</span></button>

               <button className="border px-4 py-2 rounded-md text-slate-300 font-semibold flex gap-2 items-center">Hackathons <svg className="w-8" focusable="false" aria-hidden="true" fill="white" viewBox="0 0 24 24" data-testid="TrendingUpIcon"><path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path></svg></button>
            </div>
         </div>
         <div className="bg-[#171a1a] w-[80%] p-4 rounded-md flex justify-between">
            <select name="" onChange={(e) => handleChange(e)} id="" className="rounded-md px-2 py-4 w-96 bg-slate-200">
               <option value="">Platform</option>
               <option value="all">All</option>
               <option value="leetcode">Leetcode</option>
               <option value="codechef">Codechef</option>
               <option value="codeforces">Codeforces</option>
               <option value="codingnanjas">Coding Ninjas</option>
               <option value="hackerrank">HackerRank</option>
            </select>
            <div className="flex items-center gap-4">
               <p className="text-white">Duration(min):</p>
               <div className="bg-slate-200 rounded-md px-2 py-4 flex w-60">
                  <input className='w-full' type="range" min="0" max="360" value={duration} onChange={(e) => setDuration(e.target.value)}></input>
               </div>
            </div>
         </div>
         <p className='text-white text-xl'>Have a favorite contest platform we&apos;re missing? Join our <span className='text-blue-600 cursor-pointer'>Discord</span> or <span className='text-blue-600 cursor-pointer'>click here</span> and let us know!</p>
         <div className='flex pb-20 flex-col gap-2 w-full'>
            {
               (selectedPlatform === "all" || selectedPlatform === "codeforces") && (

                  <BentoGrid className="">
                     {
                        codeforcesContests ?
                           codeforcesContests.map((element) =>
                              <ContestCard header={""} platform={"codeforces"} link={""} duration={element.durationSeconds / 3600} id={element.id} startTime={element.startTimeSeconds} icon={<svg className='w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="code-forces"><path fill="#F44336" d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z"></path><path fill="#2196F3" d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z"></path><path fill="#FFC107" d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z"></path></svg>} title={element.name} key={element.id} />
                           ) : null
                     }
                  </BentoGrid>
               )
            }

            {
               (selectedPlatform === "all" || selectedPlatform === "leetcode") && (

                  <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
                     {
                        leetcodeContests ?
                           leetcodeContests.map((element, index) =>
                              <ContestCard platform={"leetcode"} header={""} duration={element.duration} id={index} link={element.link} startTime={element.date} icon={<img width="24" height="24" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png" alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo" />}
                                 className={""}
                                 title={element.name} key={index} />
                           ) : null
                     }
                  </BentoGrid>
               )
            }

            {

               (selectedPlatform === "all" || selectedPlatform === "codechef") && (

                  <h1 className='my-5 text-6xl text-teal-500 font-semibold'>
                     <i>
                        !code chef contest are yet to implement!
                     </i>
                  </h1>
               )
            }

            {

               (selectedPlatform === "all" || selectedPlatform === "gfg") && (

                  <h1 className='my-5 text-6xl text-teal-500 font-semibold'>
                     <i>
                        !geeks for geeks contest are yet to implement!
                     </i>
                  </h1>
               )
            }
            {
               (selectedPlatform === "all" || selectedPlatform === "hackerrank") && (

                  <h1 className='my-5 text-6xl text-teal-500 font-semibold'>
                     <i>
                        !hackrank contest are yet to implement!
                     </i>
                  </h1>
               )
            }
            {
               (selectedPlatform === "all" || selectedPlatform === "codingnanjas") && (

                  <h1 className='my-5 text-6xl text-teal-500 font-semibold'>
                     <i>
                        !codingninja contest are yet to implement!
                     </i>
                  </h1>
               )
            }
         </div>
      </div>
   )
}


export default Contests