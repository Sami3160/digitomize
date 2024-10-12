import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "../utils/cn"; // Adjust the path if necessary
import { Link, useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import { motion } from "framer-motion"; // Assuming you're using framer-motion for animations
import tcs from '../assets/company/TCS.jpg'
import amazon from '../assets/company/amazon.jpg'
import meta from '../assets/company/logo-Meta.jpg'
import google from '../assets/company/Google.jpg'

export default function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const navigate=useNavigate()
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 shadow-teal-200 rounded-full shadow-lg", className)}>
      <Menu setActive={setActive}>
      <HoveredLink to="/">Home</HoveredLink>

        {/* <MenuItem setActive={setActive} active={active} item="Home"> */}
          {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/web-dev">Web Development</HoveredLink>
            <HoveredLink to="/interface-design">Interface Design</HoveredLink>
            <HoveredLink to="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink to="/branding">Branding</HoveredLink>
          </div> */}
        {/* </MenuItem> */}
         <MenuItem setActive={setActive} active={active} item="Top Companies">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Google"
              href="/home?company=google"
              // onClick={()=>navigate('/algochurn')}
              src={google}
              description="Prepare for tech interviews like never before."
            />
            {/* <ProductItem
              title="Meta"
              href="/home?company=meta"
              src={meta}
              description="Production-ready Tailwind CSS components for your next project."
            /> */}
            <ProductItem
              title="Amazon"
              href="/home?company=amazon"
              src={amazon}
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="TCS"
              href="/home?company=tcs"
              src={tcs}
              description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI."
            />
          </div>
        </MenuItem>
        <HoveredLink to="/leaderboard">Leaderboard</HoveredLink>
        <HoveredLink to="/blogs">Blogs</HoveredLink>
        {/* <MenuItem setActive={setActive} active={active} item="Blogs"> */}
          {/* <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/individual">Individual</HoveredLink>
            <HoveredLink to="/team">Team</HoveredLink>
            <HoveredLink to="/enterprise">Enterprise</HoveredLink>
          </div> */}
        {/* </MenuItem> */}
        {/* <MenuItem setActive={setActive} active={active} item="Leaderboard">
        </MenuItem> */}
        <button className="border  self-start text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
          onClick={() => navigate("/login")}
        >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </Menu>
    </div>
  );
}

