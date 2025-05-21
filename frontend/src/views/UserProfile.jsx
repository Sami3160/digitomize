import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
function UserProfile() {
    const [userData, setUserData] = useState({})
    const { user_id } = useParams()
    const [showModal, setShowModal] = useState('')
        const {user}=useContext(AuthContext)
    
    const logoMap = {
        "Leetcode": "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png",
        "CodingNinjas": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaGVYSWZNTQAqAAAACAAEAQYAAwAAAAEAAgAAARIAAwAAAAEAAQAAASgAAwAAAAEAAgAAh2kABAAAAAEAAAA+AAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABfoAMABAAAAAEAAABfAAAAAPfNbXAAAAP5SURBVHicvZZPaFxVFMa/79z73mTG2Fg0pLUmbWyTagJKERFDNYILbVpQDK0uBK1pElLcuNCFS8GNIKhV1CiKoCCNrQspKP6BqMWNEanFP4lJkyxKxGqNTSYz8969x0WccTKZxHTy5ywevPfuvd/vnXfuPR+xghjubWiRmLfR4GZV7BDySq9qSehK5pcLBRBSnrLLDOB4z/b7lOxV1TYbyCYhoAVJVqoNAvAAcuqvKQswfGTXdeMSvyDCTkMg8kDsK/7YpQDUAH4RwLm+7TfCxR8kLFsysSJeM9nyIcU3P/Y0bFXHgdCyZS7Wyn9wJQAKMFB5PmnZmok3QroEYKy74e7Q4NDcBooDQL4GqODjVmiWKzYCMEJI5RugsI4H6LyKBYDRnuvrAXdXzi0tHhoicorI+wkAUwSiVQKogH/MZ4DxHQkxNdklAEJDxE4/VeVzgfVDDa9O/kWsTY1aAFBFG5dIa8IQGafv+YTtaj72a3YtRBcAHD8IQ7C13K+3QmSdn/BR9onm/qk1FwcA217bkpyJ0tvKAQQCxA7vN7899TsA3PnA/iYNoswWX3N+YGDAXY7QLQcOpBLJqD4LNzU08Nl0AWA6l7tKiM1eFxIQQM4pFBjMP3PUI0YT3ed1dnxvZ8dPSj1rlL945fdfnzw1lh/X/kh7VTRTfauh360euyFsBX0TVFIphnsB/AfgJao2iqC0uZCAU42s6ET+mVG+6b3rCsJgD4A9AOCi+Izz2gdgrHi+QPcp5ckgGVhVBUDEUe7FrwY+Olc8zoZkQkuO5HwoGHnD2fz9lydPjdx+6N59jKI+gBbA54KZE9+cGJwpnjf4zmAGwNNtBzuOR7noQYI7Vd235or0S6UaHO1rvAmxnhZBdXEdCAGvSAu1tfH1ifFygGsRAkEG1EUFpQBUNfSxbFovcQCQbOQuQZFddAwoEBixavyudQWoQe20kn+y5CRSzG9DKO5ZV4Br+4fmAJ0s12ByTiFk58jRneuWBSGgBM6UA3AKhIZXS+zeGO1qrFsPAALASM/2+xMiH0ZLtOLQEDmvP8PzFSPui5j2QhjlVu3W6k3dJQLA8OEttRIkfrDCOufLDw7+9QHZ2GcVvEhqrlLhgiklHi0kfrR7x1vJgIf/zxEJ5xcoLdoKAKDOdxRcsad/ORPLQ0Ikl3PghXdauR0oyoAWjuCm/snvFHqsyq7Sb11mLOgBqXTmmXTkP0kFGwexAGDru7/NViHxcDqnH6csYTaAY1EX3NY/fOEis51zsT4L1b+TlrBCrKLmlo1llx3ubWgJIY95oEMVjVZYRWLVdjS/C7z6/Sv6rrNHW6pTcbrVAzcI0OCBzVS1lXJw/qLi8No/YzuoX35Hj9UAAAAASUVORK5CYII=",
        "Codeforces": "https://img.icons8.com/external-tal-revivo-filled-tal-revivo/24/external-codeforces-programming-competitions-and-contests-programming-community-logo-filled-tal-revivo.png",
        "GfG": "https://digitomize.com/assets/geeksforgeeks-1a83bb08.svg",
        "CodeChef": "https://digitomize.com/assets/codechef-f6a4f2da.svg",
        "GitHub": "https://img.icons8.com/ios-glyphs/30/github.png",
        "HackerRank": "https://img.icons8.com/windows/32/hackerrank.png",
    }
    const contactMap = {
        "X": {
            "img": "https://img.icons8.com/ios-filled/50/twitterx--v1.png",
            "profile": "https://twitter.com/rchandra"
        },
        "LinkedIn": {
            "img": "https://img.icons8.com/fluency/48/linkedin.png",
            "profile": "https://linkedin.com/rchandra"
        },
        "Medium": {
            "img":"https://img.icons8.com/glyph-neue/64/medium-monogram.png",
            "profile": "https://medium.com/rchandra"
        },
        "StackOverflow": {
            "img":"https://img.icons8.com/color/48/stackoverflow.png",
            "profile": "https://stackoverflow.com/rchandra"
        },
    }

    const dummyStats = {
        "Leetcode": {
            "Username": "RChandra",
            "Contest Rating": 1500,
            "Contests Attended": 4,
            "Problems Solved": 100,
            "Profile Link": "https://leetcode.com/rchandra",
        },
        "Codeforces": {
            "Username": "RChandra",
            "Contest Rating": 1700,
            "Contests Attended": 10,
            "Problems Solved": 200,
            "Profile Link": "https://codeforces.com/rchandra",
        },
        "GfG": {
            "Username": "RChandra",
            "Contest Rating": 1100,
            "Contests Attended": 2,
            "Problems Solved": 50,
            "Profile Link": "https://geeksforgeeks.com/rchandra",
        },
        "CodeChef": {
            "Username": "RChandra",
            "Contest Rating": 1300,
            "Contests Attended": 5,
            "Problems Solved": 70,
            "Profile Link": "https://codechef.com/rchandra",
        },
        "GitHub": {
            "Username": "RChandra",
            "Repositories": 10,
            "Stars": 20,
            "Total Contributions": 100,
            "Profile Link": "https://github.com/rchandra",
        },
        "HackerRank": {
            "Username": "RChandra",
            "Contest Rating": 1400,
            "Contests Attended": 6,
            "Problems Solved": 80,
            "Profile Link": "https://hackerrank.com/rchandra",
        },
        "CodingNinjas": "No stats available",
    }
    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await axios.get(`${apiBaseUrl}/users/getUser`, {
                    params: {
                        user_id
                    }
                })
                setUserData(res.data)
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getdata()

    }, [user_id])
    useEffect(() => {
        if(!user){
            return
        }
        console.log(user._id)
        console.log(user_id)
        if(String(user._id)===String(user_id)){
            console.log("same same")
            return
        }
        const updateView = async () => {
            try {
                const res = await axios.post(`${apiBaseUrl}/users/updateViews`, {
                    _id:user?._id,
                    userId:user_id
                })
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        updateView()

    }, [user_id])
    console.log(user_id);
    if (!user_id) {
        return <h1>No user found</h1>
    }
    else if (Object.keys(userData).length === 0) {
        return <h1 className="text-white">Loading...</h1>
    }
    else {
        return (
            <div className="mt-10">
                <section className="w-full flex flex-col gap-2 pt-20  ">
                    <div className="grid grid-cols-2 p-16 w-[90%] mx-auto bg-[#161616]">
                        <div className="info col-span-1 bg-[#1B1B1B] shadow-lg p-10">
                            <h1 className="text-5xl text-start text-white font-extrabold">{userData?.username}</h1>
                            <p className="text-xl mb-2 text-start text-white font-[100]  font-sans">{userData?.firstname} {userData?.lastname}</p>
                            {
                                userData?.bio && <p className="text-white text-md  font-[100] font-sans">
                                    Description
                                    <span className="text-[#5bdac7e7]"> {userData.bio}</span>
                                </p>
                            }
                            {
                                userData?.institute && (
                                    <p className="text-white text-md  font-sans font-[100]">
                                        Institute name
                                        <span className="text-[#5bdac7e7]"> {userData.institute}</span>
                                    </p>
                                )
                            }
                            <p className="text-white text-md  font-sans font-[100]">
                                Contests attended
                                <span className="text-[#5bdac7e7]"> 4</span>
                            </p>
                            <p className="text-white text-2xl font-bold font-sans mt-2">
                                Available profiles
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2">

                                {
                                    Object.keys(logoMap).map((keys, index) => (
                                        <div className="relative"
                                            key={index}
                                            onMouseEnter={() => setShowModal(keys)}
                                            onMouseLeave={() => setShowModal('')}
                                        >
                                            <img
                                                src={logoMap[keys]} className="h-14 w-14 cursor-pointer hover:scale-125 transition-all  rounded-full p-2"
                                            />
                                            {
                                                showModal === keys && <StatsModal keys={keys} stats={dummyStats} />
                                            }

                                        </div>
                                    ))
                                }
                            </div>
                            <p className="text-white text-2xl font-bold font-sans mt-2">
                                Contacts
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2">

                                {
                                    Object.keys(contactMap).map((keys, index) => (
                                        <a className="relative"
                                            key={index}
                                            href={contactMap[keys].profile}
                                            target="_blank"
                                        >
                                            <img
                                                src={contactMap[keys].img} className="h-14 w-14 cursor-pointer hover:scale-125 transition-all  rounded-full p-2"
                                            />
                                        </a>
                                    ))
                                }
                            </div>





                        </div>

                        <div className="profilepic relative col-span-1 flex p-10 shadow-lg justify-center bg-[#1B1B1B]">
                            <div className="bg-[#5bdac7e7] absolute h-full  z-10 right-0 top-0 w-full"
                                style={{ clipPath: "polygon(66% 0, 100% 0, 100% 100%, 25% 100%, 83% 49%)" }}
                            >

                            </div>
                            <img src={userData.profileUrl} alt="profile" className="shadow-lg w-96 h-96 object-cover z-20" />
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}

const StatsModal = ({ keys, stats }) => {
    return (
        <div className={`absolute   left-0 z-30 pt-7 h-auto ${stats[keys] === "No stats available" ? '-bottom-16' : '-bottom-36'}`}>
            <div className="p-2 bg-slate-800 w-60 text-white rounded-lg px-4 py-4">

                <div className="title text-white font-semibold">
                    {keys} stats
                </div>
                <div className="pl-2 text-gray-300">

                    {
                        stats[keys] === "No stats available" ? <p>No stats available</p> :
                            Object.keys(stats[keys]).map((key, index) => {
                                if (key === "Profile Link") {
                                    return (
                                        <a key={index} href={stats[keys][key]} target="_blank" rel="noreferrer" className="text-[#5bdac7e7]">
                                            {key}

                                        </a>
                                    )
                                }
                                return (
                                    <div key={index} className="flex justify-between items-center">
                                        <p>{key}</p>
                                        <p>{stats[keys][key]}</p>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserProfile