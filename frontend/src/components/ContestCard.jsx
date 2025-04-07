import { cn } from "../utils/cn";
import { Link, Navigate } from "react-router-dom";
import atcoder from "../assets/atcoder.png";
import codechef from "../assets/codechef.jpeg";
import { useState } from "react";
const ContestCard = ({
  id,
  title,
  description,
  header,
  icon,
  className,
  startTime,
  duration,
  platform,
  link,
}) => {
  return (
    <BentoGridItem
      // key={key}
      title={title}
      description={description}
      header={header}
      icon={icon}
      className={className}
      startTime={startTime}
      duration={duration}
      id={id}
      link={link}
      platform={platform}
    />
  );
};

export const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800"></div>
);

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 w-[90vw] mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  key,
  className,
  title,
  header,
  icon,
  startTime,
  duration,
  id,
  platform,
  link,
  description,
}) => {
  // if (typeof startTime === "number") {
  //   startTime = new Date(startTime * 1000).toLocaleString();
  // }
  // const [link, setLink] = useState("")
  let linkRef = "";
  switch (platform) {
    case "Codeforces":
      linkRef = "https://codeforces.com/contests/";
      break;
    case "LeetCode":
      linkRef = "https://leetcode.com/";
      break;
    case "Codechef":
      linkRef = "https://www.codechef.com/";
      break;
    case "hackerrank":
      linkRef = "https://www.hackerrank.com/contests/";
      break;
    case "yukicoder":
      linkRef = "https://yukicoder.me/";
      break;
    case "AtCoder":
      linkRef = "https://atcoder.jp/";
      break;
  }

  // if()
  return (
    <div
    className={cn(
      "row-span-1 min-h-56 rounded-2xl group/bento hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all duration-300 shadow-none p-5 bg-[#0e0e0e] border border-teal-400/20 flex flex-col justify-between relative overflow-hidden",
      className
    )}
  >
    {header}
    <div className="group-hover/bento:translate-x-1 transition-all duration-300 h-full flex flex-col items-center justify-center relative">
      
      {/* Start Time */}
      <div className="text-teal-300 w-full text-sm font-medium absolute top-3 left-4">
        Starts on: {startTime}
      </div>
  
      {/* Platform Icon */}
      <div className="absolute top-3 right-4">
        {platform === "LeetCode" ? (
          <img
            width="28"
            height="28"
            className="drop-shadow-xl"
            src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
            alt="LeetCode"
          />
        ) : platform === "Codeforces" ? (
          <svg
            className="w-7 drop-shadow-md"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="#F44336" d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z" />
            <path fill="#2196F3" d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z" />
            <path fill="#FFC107" d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z" />
          </svg>
        ) : platform === "codingninjas" ? (
          <img
            width="32"
            height="32"
            className="rounded-full shadow"
            src="https://www.vhv.rs/dpng/d/575-5752613_coding-ninjas-blog-graphic-design-hd-png-download.png"
            alt="Coding Ninjas"
          />
        ) : platform === "AtCoder" ? (
          <img width="32" height="32" className="rounded shadow" src={atcoder} alt="AtCoder" />
        ) : platform === "codechef" ? (
          <img width="32" height="32" className="rounded shadow" src={codechef} alt="Codechef" />
        ) : platform === "yukicoder" ? (
          <img width="32" height="32" className="rounded-full shadow" src="https://pbs.twimg.com/profile_images/875757061669232640/T1_mPQuO_400x400.jpg" alt="Yukicoder" />
        ) : null}
      </div>
  
      {/* Title */}
      <div className="text-neutral-100 text-center text-xl md:text-2xl font-bold mt-10">
        {title}
      </div>
  
      {/* Duration */}
      <div className="text-neutral-400 absolute bottom-3 left-4 text-sm font-medium">
        Duration: {duration.hours}h {duration.minutes}m
      </div>
  
      {/* Link Arrow */}
      <Link to={linkRef} target="_blank" className="absolute bottom-3 right-4 group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-right transition-transform group-hover:translate-x-1 duration-300 text-teal-300"
        >
          <path d="M18 8L22 12L18 16"></path>
          <path d="M2 12H22"></path>
        </svg>
      </Link>
    </div>
  </div>
  
  );
};

export default ContestCard;
