import { useEffect, useState } from "react";
import ContestCard, { BentoGrid } from "./ContestCard";
import axios from "axios";

const Contests = () => {
  const [duration, setDuration] = useState(50);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [allContests, setAllContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);

  useEffect(async () => {
    const res = await axios.get("https://api.digitomize.com/contests");
    setAllContests(res.data.results);
    setFilteredContests(res.data.results);
  }, []);

  useEffect(() => {
    if (selectedPlatform === "all") {
      setFilteredContests(allContests);
    } else {
      setFilteredContests(
        allContests.filter((contest) => contest.host === selectedPlatform)
      );
    }
  }, [selectedPlatform]);

  const handleChange = (e) => {
    if (!e.target.value) {
      setSelectedPlatform("all");
    } else {
      setSelectedPlatform(e.target.value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className=" text-center pt-44 flex flex-col gap-10">
        <p className="text-white text-7xl font-bold ">
          All at <span className="rounded-md bg-blue-500 px-4">one</span> place
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="border py-2 px-4 rounded-md text-slate-300 font-semibold flex gap-2 items-center">
            Contests{" "}
            <svg
              className="w-8"
              focusable="false"
              aria-hidden="true"
              fill="white"
              viewBox="0 0 24 24"
              data-testid="TrendingUpIcon"
            >
              <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
            </svg>
          </button>

          <button className="border px-4 py-3 rounded-md text-slate-300 font-semibold flex gap-2 items-center">
            Challenges{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-swords "
            >
              <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"></polyline>
              <line x1="13" x2="19" y1="19" y2="13"></line>
              <line x1="16" x2="20" y1="16" y2="20"></line>
              <line x1="19" x2="21" y1="21" y2="19"></line>
              <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"></polyline>
              <line x1="5" x2="9" y1="14" y2="18"></line>
              <line x1="7" x2="4" y1="17" y2="20"></line>
              <line x1="3" x2="5" y1="19" y2="21"></line>
            </svg>
            <span className="bg-yellow-500 text-black rounded-full px-[10px] text-center">
              new
            </span>
          </button>

          <button className="border px-4 py-2 rounded-md text-slate-300 font-semibold flex gap-2 items-center">
            Hackathons{" "}
            <svg
              className="w-8"
              focusable="false"
              aria-hidden="true"
              fill="white"
              viewBox="0 0 24 24"
              data-testid="TrendingUpIcon"
            >
              <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-[#171a1a] w-[80%] p-4 rounded-md flex justify-between">
        <select
          name=""
          onChange={(e) => handleChange(e)}
          id=""
          className="rounded-md px-2 py-4 w-96 bg-slate-200"
        >
          <option value="">Platform</option>
          <option value="all">All</option>
          <option value="leetcode">Leetcode</option>
          <option value="codechef">Codechef</option>
          <option value="codeforces">Codeforces</option>
          <option value="codingninjas">coding Ninjas</option>
          <option value="atcoder">Atcoder</option>
        </select>
        <div className="flex items-center gap-4">
          <p className="text-white">Duration(min):</p>
          <div className="bg-slate-200 rounded-md px-2 py-4 flex w-60">
            <input
              className="w-full"
              type="range"
              min="0"
              max="360"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
      <p className="text-white text-xl">
        Have a favorite contest platform we&apos;re missing? Join our{" "}
        <span className="text-blue-600 cursor-pointer">Discord</span> or{" "}
        <span className="text-blue-600 cursor-pointer">click here</span> and let
        us know!
      </p>

      <div className="flex pb-20 flex-col gap-2 w-full">
        {
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
            {filteredContests
              ? filteredContests.map((element, index) => (
                  <ContestCard
                    platform={element.host}
                    header={""}
                    duration={element.duration}
                    id={index}
                    link={element.url}
                    startTime={element.startTimeUnix}
                    icon={
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
                        alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo"
                      />
                    }
                    className={""}
                    title={element.name}
                    key={index}
                  />
                ))
              : null}
          </BentoGrid>
        }
      </div>
    </div>
  );
};

export default Contests;
