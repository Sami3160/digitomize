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
        "row-span-1 min-h-52 rounded-xl group/bento hover:shadow-xl transition duration-200  shadow-none p-4 bg-black border-2  justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col items-center justify-center relative">
        <div className="text-white w-full text-[14px] font-semibold absolute top-2 left-0">
          Starts on : {startTime}
        </div>
        <div className="absolute top-2 right-2">
          {platform == "LeetCode" ? (
            //leetcode icon
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/24/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
              alt="external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo"
            />
          ) : platform == "Codeforces" ? (
            //codeforces icon
            <svg
              className="w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="code-forces"
            >
              <path
                fill="#F44336"
                d="M24 19.5V12a1.5 1.5 0 0 0-1.5-1.5h-3A1.5 1.5 0 0 0 18 12v7.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5z"
              ></path>
              <path
                fill="#2196F3"
                d="M13.5 21a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 13.5 3h-3C9.673 3 9 3.672 9 4.5v15c0 .828.673 1.5 1.5 1.5h3z"
              ></path>
              <path
                fill="#FFC107"
                d="M0 19.5c0 .828.673 1.5 1.5 1.5h3A1.5 1.5 0 0 0 6 19.5V9a1.5 1.5 0 0 0-1.5-1.5h-3C.673 7.5 0 8.172 0 9v10.5z"
              ></path>
            </svg>
          ) : platform === "codingninjas" ? (
            <img
              width="50"
              height="70"
              src="https://www.vhv.rs/dpng/d/575-5752613_coding-ninjas-blog-graphic-design-hd-png-download.png"
              alt="coding ninjas icon"
            />
          ) : platform === "AtCoder" ? (
            <img
              width="40"
              height="60"
              src={atcoder}
              alt="coding ninjas icon"
            />
          ) : platform === "codechef" ? (
            <img
              width="40"
              height="60"
              src={codechef}
              alt="coding ninjas icon"
            />
          ) : platform === "yukicoder" ? (
            <img
              width="40"
              height="60"
              src={
                "https://pbs.twimg.com/profile_images/875757061669232640/T1_mPQuO_400x400.jpg"
              }
              alt="yuki coder"
            />
          ) : null}
        </div>
        <div className="font-sans font-bold  text-neutral-200 mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="text-white absolute bottom-0 left-2 text-[14px] font-semibold">
          Duration: {duration.hours} Hours {duration.minutes} Minutes
        </div>
        <Link
          to={linkRef}
          target="blank"
          className="absolute bottom-0 right-2 cursor-pointer"
        >
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
            className="lucide lucide-move-right md:w-10 md:h-10"
            style={{ color: "white" }}
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
