import  { useContext,  useState } from "react";
import { HoveredLink, HoveredLink2, Menu, MenuItem, MenuItemLogo, ProductItem } from "../components/ui/navbar-menu";
import { cn } from "../utils/cn"; // Adjust the path if necessary
import {  useNavigate } from "react-router-dom"; // Use react-router-dom for navigation
import tcs from '../assets/company/TCS.jpg'
import amazon from '../assets/company/amazon.jpg'
import meta from '../assets/company/logo-Meta.jpg'
import google from '../assets/company/google.png'
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const navigate = useNavigate()
  const { user, logout } = useContext(AuthContext)
  
  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50 rounded-full shadow-lg")}>
      <Menu setActive={setActive}>
        <HoveredLink to="/home">Home</HoveredLink>

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
            <MenuItemLogo setActive={setActive}  active={active} item={user.profileUrl}>
              <div className="felx- flex-col space-y-3  text-sm">
                <HoveredLink2 to={"/profile"}>Your Profile</HoveredLink2>
                <HoveredLink2 to={"/contest"}>Your Contests</HoveredLink2>
                <HoveredLink2 onClick={() => logout()}>Logout</HoveredLink2>
              </div>
            </MenuItemLogo>
          ) : (
            <button className=" text-sm font-medium relative text-white px-3 py-2 border-2 border-[#1b1a1a] bg-[#1b1a1a] hover:bg-[#242323]  rounded-full flex justify-center items-center transition-all ease-in-out active:scale-95"
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
                {localStorage.getItem("user") ? "Login" : "Sign in"}
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          )
        }


      </Menu>
    </div>
  );
}

