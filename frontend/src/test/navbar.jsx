import React, { useContext, useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, MenuItemLogo, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "../utils/cn"; // Adjust the path if necessary
import { Link, useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import { motion } from "framer-motion"; // Assuming you're using framer-motion for animations
import tcs from '../assets/company/TCS.jpg'
import amazon from '../assets/company/amazon.jpg'
import meta from '../assets/company/logo-Meta.jpg'
import google from '../assets/company/google.png'
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  useEffect
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
              href="/problems?company=google"
              // onClick={()=>navigate('/algochurn')}
              src={google}
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Meta"
              href="/problems?company=meta"
              src={meta}
              description="Production-ready Tailwind CSS components for your next project."
            />
            <ProductItem
              title="Amazon"
              href="/problems?company=amazon"
              src={amazon}
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="TCS"
              href="/problems?company=tcs"
              src={tcs}
              description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI."
            />
          </div>
        </MenuItem>
        <HoveredLink to="/contest">Contests</HoveredLink>
        <HoveredLink to="/blogs">Blogs</HoveredLink>
        {
          user && localStorage.getItem("user") ? (
            <MenuItemLogo setActive={setActive} active={active} item="https://img.icons8.com/officel/80/test-account.png">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink to="/profile">Your Profile</HoveredLink>
                <HoveredLink to="/contest">Your Contests</HoveredLink>
                <HoveredLink onClick={() => logout()}>Logout</HoveredLink>
              </div>
            </MenuItemLogo>
          ) : (
            <button className="border  self-start text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
              onClick={() => {
                if (localStorage.getItem("user")) {
                  // localStorage.removeItem("userid")
                  navigate('/login')
                } else {
                  navigate('/signin')
                }
              }}
            >
              <span>
                {localStorage.getItem("user") ? localStorage.getItem("token")?"Loading":"Login" : "Signin"}
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          )
        }


      </Menu>
    </div>
  );
}

