import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GitHubContributionGraph from '../components/GitHubContributionGraph';
import SettingsModal from '../components/Dashboard/Settings';
import LinkModal from '../components/Dashboard/LinkAccounts';
import NewBlogModal from '../components/Dashboard/NewBlogModal';
import axios from 'axios';


export default function Dashboard() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const data = Array.from({ length: 365 }, () => Math.floor(Math.random() * 4));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false)
    }
    const closeLinkModal = () => {
        setIsLinkModalOpen(false)
    }
useEffect(()=>{
    getLeetcodeProfile("sami3160");
},[])
let initdata = {
    "profile" : { 
        "name":"",
        "username":"",
        "avatar":"",
        "ranking":0
    },
    "badges":{},
    "solved":{
        "totalsolved":0,
        "easy":0,
        "medium":0,
        "hard":0,
    },
    "contest":{
        "totalattended":0,
        "contestRating":0.0,
        "contestGlobalRanking":0
    }
}
    const [leetcodedata, setLeetcodedata] = useState(initdata);
   
    
    async function getLeetcodeProfile(username) {
        try {
            const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}`);
            const response2 = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/badges`);
            const response3 = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
            const response4 = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/contest`);


            console.log('User Profile:', response.data);
            console.log('Badges:', response2.data);
            console.log('Solved:', response3.data);
            console.log('Contest:', response4.data);
            const profileData = response.data;
            const badgesData = response2.data;
            const solvedData = response3.data;
            const contestData = response4.data;
            
            const newleetcodedata = {
                "profile" : { 
                    "name":profileData.name,
                    "username":profileData.username,
                    "avatar":profileData.avatar,
                    "ranking":profileData.ranking
                },
                "badges":badgesData,
                "solved":{
                    "totalsolved":solvedData.solvedProblem,
                    "easy":solvedData.easySolved,
                    "medium":solvedData.mediumSolved,
                    "hard":solvedData.hardSolved,
                },
                "contest":{
                    "totalattended":contestData.contestAttend,
                    "contestRating":contestData.contestRating,
                    "contestGlobalRanking":contestData.contestGlobalRanking
                }
                }
            setLeetcodedata(newleetcodedata);
            
            
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }


    if (user) return (
        <div className='w-full h-full'>
            {isModalOpen && <SettingsModal isOpen={isModalOpen} onRequestClose={closeModal} />}
            {isLinkModalOpen && <LinkModal isOpen={isLinkModalOpen} onRequestClose={closeLinkModal} />}
            {isBlogModalOpen && <NewBlogModal isOpen={isBlogModalOpen} onRequestClose={() => setIsBlogModalOpen(false)} />}

            <div className="flex flex-row pt-24 px-10 pb-4 mt-10">
                <div className="w-2/12 mr-6">
                    <div className="bg-[#0D1717] text-gray-500 rounded-xl gap-3 shadow-lg mb-6 px-6 py-4 flex flex-col items-center">
                        <img src={user?.profileUrl} className='rounded-md' alt="" srcSet="" />
                        <p className='text-sm text-gray-300 font-medium'>{user?.username}</p>
                        <p className='text-xs font-light -mt-3 text-gray-400'>{user?.email}</p>
                        <p className='text-xs font-light text-gray-400 text-wrap'>{user?.bio}</p>
                        {/* {console.log(user)} */}
                        <p className='text-md shadow-sm cursor-pointer w-full text-center bg-[#21302D] text-teal-100 p-1 px-4 rounded-lg'
                            onClick={() => setIsModalOpen(true)}

                        >Edit Profile</p>
                        <p className='text-md shadow-sm cursor-pointer w-full text-center bg-[#21302D] text-blue-100 p-1 px-4 rounded-lg'
                            onClick={() => setIsLinkModalOpen(true)}
                        >Link Account</p>
                        <p className='text-md shadow-sm cursor-pointer w-full text-center bg-[#21302D] text-yellow-100 p-1 px-4 rounded-lg'
                            onClick={() => setIsBlogModalOpen(true)}
                        >
                            New Blog
                        </p>
                        <p className='text-md shadow-sm cursor-pointer w-full text-center bg-[#21302D] text-red-100 p-1 px-4 rounded-lg'
                            onClick={() => {
                                logout()
                                navigate('/')
                            }}
                        >Logout
                        </p>

                    </div>

                    <div className="bg-[#0D1717] text-gray-500 rounded-xl shadow-lg mb-6 px-6 py-4">

                        <p className="inline-block  hover:text-gray-600 my-2 w-full">
                            Streak 0
                        </p>
                        <p className="inline-block  hover:text-gray-600 my-2 w-full">
                            Active Days 0
                        </p>
                        <p className="inline-block  hover:text-gray-600 my-2 w-full">
                            Longest Streak 0
                        </p>
                        <p className="inline-block  hover:text-gray-600 my-2 w-full">
                            Total Blogs 0
                        </p>
                        <p className="inline-block  hover:text-gray-600 my-2 w-full">
                            Profile Views 0
                        </p>
                    </div>
                </div>

                <div className="w-10/12">
                    <div className="flex flex-row">
                        <div className="bg-no-repeat bg-red-200 border border-red-300 rounded-xl w-7/12 mr-2 p-6" style={{ backgroundImage: "url(https://previews.dropbox.com/p/thumb/AAvyFru8elv-S19NMGkQcztLLpDd6Y6VVVMqKhwISfNEpqV59iR5sJaPD4VTrz8ExV7WU9ryYPIUW8Gk2JmEm03OLBE2zAeQ3i7sjFx80O-7skVlsmlm0qRT0n7z9t07jU_E9KafA9l4rz68MsaZPazbDKBdcvEEEQPPc3TmZDsIhes1U-Z0YsH0uc2RSqEb0b83A1GNRo86e-8TbEoNqyX0gxBG-14Tawn0sZWLo5Iv96X-x10kVauME-Mc9HGS5G4h_26P2oHhiZ3SEgj6jW0KlEnsh2H_yTego0grbhdcN1Yjd_rLpyHUt5XhXHJwoqyJ_ylwvZD9-dRLgi_fM_7j/p.png?fv_content=true&size_mode=5);", backgroundPosition: "90% center;" }}>
                            <p className="text-5xl text-indigo-900">Welcome <br /><strong>Lorem Ipsum</strong></p>
                            <span className="bg-red-300 text-xl text-white inline-block rounded-full mt-12 px-8 py-2"><strong>01:51</strong></span>
                        </div>

                        <div className="bg-no-repeat bg-orange-200 border border-orange-300 rounded-xl w-5/12 ml-2 p-6" style={{ backgroundImage: " url(https://previews.dropbox.com/p/thumb/AAuwpqWfUgs9aC5lRoM_f-yi7OPV4txbpW1makBEj5l21sDbEGYsrC9sb6bwUFXTSsekeka5xb7_IHCdyM4p9XCUaoUjpaTSlKK99S_k4L5PIspjqKkiWoaUYiAeQIdnaUvZJlgAGVUEJoy-1PA9i6Jj0GHQTrF_h9MVEnCyPQ-kg4_p7kZ8Yk0TMTL7XDx4jGJFkz75geOdOklKT3GqY9U9JtxxvRRyo1Un8hOObbWQBS1eYE-MowAI5rNqHCE_e-44yXKY6AKJocLPXz_U4xp87K4mVGehFKC6dgk_i5Ur7gspuD7gRBDvd0sanJ9Ybr_6s2hZhrpad-2WFwWqSNkh/p.png?fv_content=true&size_mode=5)", backgroundPosition: "100% 40%;" }}>
                            <p className="text-5xl text-indigo-900">Inbox <br /><strong>23</strong></p>
                            <a href="" className="bg-orange-300 text-xl text-white underline hover:no-underline inline-block rounded-full mt-12 px-8 py-2"><strong>See messages</strong></a>
                        </div>
                    </div>
                    <div className="flex flex-row h-64 text-sm font-semibold  gap-4 mt-4 ">
                        <div className="bg-white rounded-xl shadow-lg p-2    w-4/12 overflow-scroll">
                            Leetcode
                            <div>
                            <div className='flex gap-1'>
                                        <img src={leetcodedata?.profile?.avatar} alt="profileImage" srcSet="" className='w-10 h-10 rounded' />
                                        <div>
                                            <p>{leetcodedata?.profile?.username}</p>
                                            <p>Rank: {leetcodedata?.profile?.ranking}</p>
                                        </div>
                                    </div>
                                    
                                <div className='flex gap-2'>
                                    <p className='flex flex-col'>Total Solved {leetcodedata?.solved?.totalsolved}</p>
                                    <div>
                                    <p>Easy: {leetcodedata?.solved?.easy}</p>
                                    <p>Medium: {leetcodedata?.solved?.medium}</p>
                                    <p>Hard: {leetcodedata?.solved?.hard}</p>
                                    </div>
                                </div>

                                <div>
                                <p>Badges</p>
                                    <div className='flex gap-2 justify-center'>
                                    {leetcodedata?.badges?.badges?.map((badge, index) => {
                                        return <div key={index} className='group relative'>
                                                <img src={badge.icon} alt={badge.name} className='w-10 h-10'/>
                                                <p className='hidden group-hover:block transition-all ease-in-out text-xs absolute bg-black text-white px-2 py-1 rounded  mt-1 w-[140px] text-center'>{badge.displayName}</p>
                                        </div>
                                    })}
                                    </div>
                                    </div>
                                <div>
                                    <p>Total Contest Attended: {leetcodedata?.contest?.totalattended}</p>
                                    <p>Contest Rating: {leetcodedata?.contest?.contestRating}</p>
                                    <p>Contest Global Ranking: {leetcodedata?.contest?.contestGlobalRanking}</p>
                                </div>
                             
                               
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg  px-6 py-4 w-4/12">
                            Codeforces
                        </div>
                        <div className="bg-white rounded-xl shadow-lg px-6 py-4 w-4/12">
                            CodeChef
                        </div>
                    </div>
                    <GitHubContributionGraph data={data} />

                </div>
            </div>
        </div>

    )
}
