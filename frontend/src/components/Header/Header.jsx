import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const menus = [
    { text: "Nature", path: "/" },
    { text: "Travel", path: "/" },
    { text: "Technology", path: "/" },
    { text: "Finance", path: "/" },
  ];

  return (
    <div className="border-b px-5  gap-5 w-full">
      <div className=" flex justify-between px-5 py-5  ">
        <Link to={"/"}>
          <span className="font-extrabold text-2xl">
            BLO
            <span className="font-extrabold text-2xl text-[#274C77]">
              GG
            </span>
            ER
          </span>
        </Link>
        <div className="flex gap-5">
          
            {menus.map((menu, index) => {
              return (
                <ul className="flex relative" key={index}>
                <li key={index} className=" font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-[0%] after:bg-[#274C77] after:transition-all after:duration-1000 hover:after:w-[100%]">
                  <Link
                    className="p-2 items-center justify-center flex"
                    to={`/?category=${menu.text}`}
                  >
                    <span className="capitalize">{menu.text}</span>
                  </Link>
                </li>
                </ul>
              );
            })}
          <div className="mt-1 flex flex-row justify-end">
          <button className=" pl-6">
            <Link
              className="bg-[#274c77] text-white px-2 py-1 rounded"
              to={"/create"}
            >
              New Post
            </Link>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
