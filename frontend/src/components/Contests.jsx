import { useEffect, useState } from "react";
import ContestCard, { BentoGrid } from "./ContestCard";
import axios from "axios";
import HackathonCard from "./HackathonCard";
const Contests = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; 
  const [duration, setDuration] = useState(50);
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [allContests, setAllContests] = useState([]);
  const [filteredContests, setFilteredContests] = useState([]);
  const [displayHackathons, setDisplayHackathons] = useState(false);
  const [hackathonData, setHackathonData] = useState([]);

  useEffect(() => {
    const getHackathonData = async () => {
      const response = await axios.get("https://api.digitomize.com/hackathons");
      console.log("hackathon list");
      console.log(response);
      setHackathonData(response.data.results);
    };
    getHackathonData();
  }, []);

  useEffect(() => {
    // const res = await axios.get("https://api.digitomize.com/contests");
    const call = async () => {
      const res = await axios.get(
        `${apiBaseUrl}/contests/allcontest`
      );
      console.log("contests data new: ");
      const data = res.data.data;
      console.log(data);

      const result = [];

      for (const platform in data) {
        data[platform].forEach((item) => {
          item.platform = platform;

          // Calculate duration
          const duration = calculateDuration(item.start, item.end);
          item.duration = duration;

          // Format start time
          item.start_time = formatDateTime(item.start);

          result.push(item);
        });
      }

      console.log("result");
      console.log(result);

      setAllContests(result);
      setFilteredContests(result);
    };
    call();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    // Extract time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format as "YYYY-MM-DD HH:MM"
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    if (selectedPlatform === "all") {
      setFilteredContests(allContests);
    } else {
      setFilteredContests(
        allContests.filter((contest) => contest.platform === selectedPlatform)
      );
    }
  }, [selectedPlatform]);

  const handleChange = (e) => {
    if (!e.target.value) {
      setSelectedPlatform("all");
    } else {
      console.log("selected: " + e.target.value);
      setSelectedPlatform(e.target.value);
    }
  };

  const calculateDuration = (start, end) => {
    // Parse the start and end timestamps
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Calculate the difference in milliseconds
    const durationMs = endDate - startDate;

    // Convert milliseconds to minutes
    const durationMinutes = Math.floor(durationMs / (1000 * 60));

    // Convert minutes to hours and minutes
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return { hours, minutes };
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="text-center pt-44 flex flex-col gap-10">
        <p className="text-white text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          All at{" "}
          <span className="bg-cyan-500 text-black px-4 py-1 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.6)]">
            one
          </span>{" "}
          place
        </p>




          {/* Toggle Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Contests */}
            <button
              onClick={() => setDisplayHackathons(false)}
              className={`border px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300 ${
                displayHackathons
                  ? "text-slate-300 hover:bg-white hover:text-black"
                  : "bg-white text-black border-blue-500 border-2"
              }`}
            >
              Contests
              <svg
                className="w-6 h-6"
                fill={displayHackathons ? "white" : "black"}
                viewBox="0 0 24 24"
              >
                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </button>

            {/* Challenges */}
            <button className="border border-slate-600 px-5 py-2 rounded-lg text-slate-300 font-semibold flex gap-2 items-center hover:bg-white hover:text-black transition duration-300">
              Challenges
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                <line x1="13" x2="19" y1="19" y2="13" />
                <line x1="16" x2="20" y1="16" y2="20" />
                <line x1="19" x2="21" y1="21" y2="19" />
                <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
                <line x1="5" x2="9" y1="14" y2="18" />
                <line x1="7" x2="4" y1="17" y2="20" />
                <line x1="3" x2="5" y1="19" y2="21" />
              </svg>
              <span className="bg-yellow-500 text-black text-sm font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            </button>

            {/* Hackathons */}
            <button
              onClick={() => setDisplayHackathons(true)}
              className={`border px-5 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-300 ${
                displayHackathons
                  ? "bg-white text-black border-blue-500 border-2"
                  : "text-slate-300 hover:bg-white hover:text-black"
              }`}
            >
              Hackathons
              <svg
                className="w-6 h-6"
                fill={displayHackathons ? "black" : "white"}
                viewBox="0 0 24 24"
              >
                <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Filters */}
        {!displayHackathons && (
        <div className="bg-[#0e1111] w-[90%] max-w-5xl mx-auto mt-10 p-6 rounded-2xl flex flex-col md:flex-row justify-between gap-6 shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-all duration-300">
          {/* Platform Select */}
          <select
            onChange={handleChange}
            className="bg-slate-200 text-black font-medium rounded-xl px-4 py-3 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="">Platform</option>
            <option value="all">All</option>
            <option value="LeetCode">LeetCode</option>
            <option value="codechef">CodeChef</option>
            <option value="Codeforces">Codeforces</option>
            <option value="codingninjas">Coding Ninjas</option>
            <option value="AtCoder">AtCoder</option>
            <option value="yukicoder">Yukicoder</option>
          </select>

          {/* Duration Slider */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-1/2">
            <label className="text-white font-medium" htmlFor="duration-slider">
              Duration (min):
            </label>
            <input
              id="duration-slider"
              className="w-full h-2 rounded-full appearance-none bg-slate-700 accent-cyan-400 focus:outline-none"
              type="range"
              min="0"
              max="360"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Suggest Platform CTA */}
      {!displayHackathons && (
        <p className="text-white text-lg mt-6 text-center">
          Have a favorite contest platform we&apos;re missing?{" "}
          <span className="text-cyan-400 hover:underline cursor-pointer font-medium">Join our Discord</span>{" "}
          or{" "}
          <span className="text-cyan-400 hover:underline cursor-pointer font-medium">click here</span>{" "}
          to let us know!
        </p>
      )}


      <div
        className={`flex pb-20 flex-col gap-2 w-full ${
          displayHackathons ? "hidden" : "block"
        }`}
      >
        {
          <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
            {filteredContests
              ? filteredContests.map((element, index) => (
                  <ContestCard
                    platform={element.platform}
                    header={""}
                    duration={element.duration}
                    id={index}
                    link={element.url}
                    startTime={element.start_time}
                    icon={
                      <img
                        width="24"
                        height="24"
                        src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
                        alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo"
                      />
                    }
                    className={""}
                    title={element.title}
                    key={index}
                  />
                ))
              : null}
          </BentoGrid>
        }
      </div>


      <p
        className={`text-white text-xl ${
          displayHackathons ? "block" : "hidden"
        }`}
      >
        Want hackathons from more platforms? Join our{" "}
        <span className="text-blue-600 cursor-pointer">Discord</span> or{" "}
        <span className="text-blue-600 cursor-pointer">click here</span> and let
        us know!
      </p>

      <div className={` ${displayHackathons ? "block" : "hidden"} `}>
        <div className="container mx-auto p-4">
          {" "}
          {/* Added container for centering */}
          <h2 className="text-2xl font-bold mb-4">Upcoming Hackathons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {" "}
            {/* Responsive grid */}
            {hackathonData.map((hackathon) => (
              <HackathonCard key={hackathon.url} hackathon={hackathon} /> // Use appropriate key
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contests;
