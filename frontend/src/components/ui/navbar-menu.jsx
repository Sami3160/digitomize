import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative hover:shadow-lg hover:bg-white transition-all duration-300 px-4 py-2 rounded-3xl  flex justify-center items-center border md:border-none border-black/30 ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] text-[#1b1a1a] font-medium "
      >
      
         <span className="hidden md:inline">  {item}</span>
                  <span className="md:hidden flex justify-center items-center text-lg"><FaChartLine /></span>
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
    onMouseLeave={() => setActive(null)}
    className="relative rounded-full border-2 bg-gradient-to-r from-[#0fdbd9] to-[#4ce0c5] border-teal-800 shadow-input flex justify-evenly md:space-x-4 px-1 py-2"
  >
    {children}
  </nav>
  
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link to={href} className="flex space-x-4">
      <img
        src={src}
        width={140}
        
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl overflow-hidden object-cover h-30"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-white">
          {title}
        </h4>
        <p className=" text-sm md:max-w-[10rem] text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="font-medium text-[#1b1a1a] px-4 py-2 rounded-full transition-all duration-300 hover:bg-white/80 hover:text-black hover:shadow-md flex justify-center items-center gap-1 backdrop-blur-sm border md:border-none border-black/30"
    >
      {children}
    </Link>
  );
};


export const HoveredLink2 = ({ children, ...rest }) => {
  return (
    <Link
      {...rest}
      className="font-medium text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900 hover:shadow-lg flex justify-center items-center gap-1 border border-white/10"
    >
      {children}
    </Link>
  );
};





export const MenuItemLogo = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative hover:shadow-lg hover:shadow-teal-600 transition-shadow duration-300 p-0  rounded-3xl">
      <motion.img src={item}
        className="cursor-pointer h-10 rounded-full  hover:opacity-[0.9] text-white"

        alt="Profile" />
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 -translate-y-3">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="w-max h-full p-4 ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
