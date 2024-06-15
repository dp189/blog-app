import React from 'react';
import { AiFillGithub , AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <AiFillGithub />, url: 'https://github.com/dp189/blog-app', title:"GitHub"},
    { icon: <AiFillInstagram />, url: 'https://www.instagram.com/', title:"Instagram" },
    { icon: <AiFillLinkedin />, url: 'https://www.linkedin.com/in/debabrata-pal-718614193', title:"LinkedIn" }, //Add linkedin profile link
  ];

  return (
    <footer className="mt-auto " >
      <div className="bg-zinc-900 text-white py-4 px-4 flex justify-between items-center border-t dark:border-t-[#f4f2f292] dark:shadow-[0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)] ">
      <div className="flex items-center">
      <Link to="/" className="flex items-center px-2 md:px-5 " title='Home'>
               <span className="font-extrabold text-2xl">
                 BLO
                 <span className="font-extrabold text-2xl text-[#4E7771]">
                 GG
                 </span>
                 ER
               </span>
            </Link>
      </div>
      <ul className="flex space-x-4">
        {socialLinks.map((link) => (
          <li key={link.url} title={link.title}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
      </div>
    </footer>
  );
};

export default Footer;













