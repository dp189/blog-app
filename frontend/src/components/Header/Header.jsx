import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";
import { LuSun, LuMoonStar } from "react-icons/lu";

const Header = () => {
  const getInitialTheme = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedTheme = window.localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme;
      }
      // If no theme is stored, check the user's system preference
      const userMedia = window.matchMedia("(prefers-color-scheme: dark)");
      if (userMedia.matches) {
        return "dark";
      }
    }
    // Default to light theme if no preference is found
    return "light";
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const menus = [
    { text: "Nature", path: "/" },
    { text: "Travel", path: "/" },
    { text: "Technology", path: "/" },
    { text: "Finance", path: "/" },
  ];

  return (
    <div className="border-b border-[#777070bf] dark:border-gray-700 bg-[#EAEADE] dark:shadow-[0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)]">
      <div className="flex justify-between items-center px-4 py-4 dark:bg-zinc-900 bg-[#EAEADE]">
        <div className="px-2 md:px-5">
          <Link to={"/"} className="flex items-center ">
            <span className="font-extrabold text-2xl dark:text-white">
              BLO<span className="text-[#4E7771]">GG</span>ER
            </span>
          </Link>
        </div>
        <div className="flex gap-5">
          <div className="hover:bg-[#70707471] mt-2 rounded-md h-8 w-8 flex justify-center items-center">
            <button onClick={toggleDarkMode} className="px-1">
              {theme === "dark" ? (
                <LuSun className="w-6 h-6 text-yellow-500" />
              ) : (
                <LuMoonStar className="w-6 h-6 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
          <button onClick={toggleSidebar} className="mt-1">
            <svg
              className="w-6 h-6 dark:text-[#EAEADE]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Right-sided Sidebar for small and medium devices with smooth transition */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-50 p-7 w-64 md:w-80 backdrop-blur-md h-full shadow-md transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800`}
      >
        <div className="flex text-xl justify-end mb-4">
          <IoCloseCircleSharp
            onClick={toggleSidebar}
            className="text-[#DDDDDD] hover:text-black dark:hover:text-white transition-all text-2xl"
          />
        </div>
        {menus.map((menu, index) => (
          <div key={index} className="py-2 font-bold flex relative">
            <Link
              to={`/?category=${menu.text}`}
              onClick={toggleSidebar}
              className="font-[600] text-[#626275b0] hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {menu.text}
            </Link>
          </div>
        ))}
        <div className="mt-2">
          <Link
            to={"/create"}
            onClick={toggleSidebar}
            className="mt-5 bg-[#4E7771] text-white px-2 py-1 rounded hover:bg-[#1f7064]"
          >
            New Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { IoCloseCircleSharp } from "react-icons/io5";

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const menus = [
//     { text: "Nature", path: "/" },
//     { text: "Travel", path: "/" },
//     { text: "Technology", path: "/" },
//     { text: "Finance", path: "/" },
//   ];

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="border-b ">
//       <div className="flex justify-between items-center px-4 py-4 ">
//         <div className="px-5">
//           <Link to={"/"} className="flex items-center px-6 ">
//             <span className="font-extrabold text-2xl">
//               BLO<span className="text-[#4E7771]">GG</span>ER
//             </span>
//           </Link>
//         </div>
//         <div className="flex gap-5">
//           <div>
//             <button onClick={toggleSidebar} className="mt-1">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>

//       </div>
//       {/* Right-sided Sidebar for small and medium devices with smooth transition */}
//       <div
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "translate-x-full"
//         } fixed inset-y-0 right-0 z-50 p-7 w-64 md:w-80 backdrop-blur-md h-full shadow-md transition-transform duration-300 ease-in-out  bg-[#ffffff7d]`}
//       >
//         <div className="flex text-xl justify-end mb-4">
//           <IoCloseCircleSharp
//             onClick={toggleSidebar}
//             className={`text-[#DDDDDD]  hover:text-black transition-all text-2xl`}
//           />
//         </div>
//         {menus.map((menu, index) => (
//           <div key={index} className="py-2 font-bold flex relative">
//             <Link
//               to={`/?category=${menu.text}`}
//               onClick={toggleSidebar}
//               className="font-[600] text-[#45454d] hover:text-black"
//             >
//               {menu.text}
//             </Link>
//           </div>
//         ))}
//         <div className="mt-2">
//           <Link
//             to={"/create"}
//             onClick={toggleSidebar}
//             className="mt-5 bg-[#4E7771] text-white px-2 py-1 rounded hover:bg-[#1f7064]"
//           >
//             New Post
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

{
  /* <div className="hidden md:flex gap-5">
          {menus.map((menu, index) => (
            <ul className="flex relative" key={index}>
              <li className="font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-[0%] after:bg-[#274C77] after:transition-all after:duration-1000 hover:after:w-[100%]">
                <Link className="p-2 flex items-center justify-center" to={`/?category=${menu.text}`}>
                  <span className="capitalize">{menu.text}</span>
                </Link>
              </li>
            </ul>
          ))}
          <button className="ml-5 bg-[#274c77] text-white px-2 py-1 rounded">
            <Link to={"/create"}>
              New Post
            </Link>
          </button>
        </div> */
}
