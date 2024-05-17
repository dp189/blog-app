import React from 'react';
import { AiFillGithub , AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    { icon: <AiFillGithub />, url: 'https://github.com/dp189/blog-app' },
    { icon: <AiFillInstagram />, url: 'https://www.instagram.com/' },
    { icon: <AiFillLinkedin />, url: 'https://www.linkedin.com/in/debabrata-pal-718614193' }, //Add linkedin profile link
  ];

  return (
    <footer className="mt-auto " >
      <div className="bg-zinc-900 text-white py-4 px-4 flex justify-between items-center border-t dark:border-t-[#f4f2f292] dark:shadow-[0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)] ">
      <div className="flex items-center">
      <Link to="/" className="flex items-center px-2 md:px-5 ">
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
          <li key={link.url}>
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












// import React from "react";

// //

// import { Link, NavLink } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-[#7a92af] border-y flex justify-end">
//       <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
//         <div className="md:flex md:justify-between">
//           <div className="mb-6 md:mb-0">
//             <Link to="/" className="flex items-center px-5">
//               <span className="font-extrabold text-2xl">
//                 BLO
//                 <span className="font-extrabold text-2xl text-[#274C77]">
//                 GG
//                 </span>
//                 ER
//               </span>
//             </Link>
//           </div>
//           <div className="grid grid-cols-3 gap-4 p-4 sm:gap-1 sm:grid-cols-3 sm:grid-c">
//             <div>
              
//               <Link to="#" className="text-white hover:text-gray-800">
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 8 19"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
//                   clip-rule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">Facebook page</span>
//             </Link>
//             </div>
//             <div>
//             <Link to="#" className="text-white hover:text-gray-800">
//               <svg
//                 className="w-4 h-4"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
//                   clip-rule="evenodd"
//                 />
//               </svg>
//               <span className="sr-only">GitHub account</span>
//             </Link>
//             </div>
//             <div>
//             <Link to="#" className="text-white hover:text-gray-800">
//               <svg
//                 fill="#ffffff"
//                 className="w-4 h-4"
//                 version="1.1"
//                 id="Layer_1"
//                 xmlns="http://www.w3.org/2000/svg"
//                 xmlns:xlink="http://www.w3.org/1999/xlink"
//                 viewBox="0 0 310 310"
//                 xml:space="preserve"
//                 stroke="#ffffff"
//               >
//                 <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                 <g
//                   id="SVGRepo_tracerCarrier"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   {" "}
//                   <g id="XMLID_801_">
//                     {" "}
//                     <path
//                       id="XMLID_802_"
//                       d="M72.16,99.73H9.927c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5H72.16c2.762,0,5-2.238,5-5V104.73 C77.16,101.969,74.922,99.73,72.16,99.73z"
//                     ></path>{" "}
//                     <path
//                       id="XMLID_803_"
//                       d="M41.066,0.341C18.422,0.341,0,18.743,0,41.362C0,63.991,18.422,82.4,41.066,82.4 c22.626,0,41.033-18.41,41.033-41.038C82.1,18.743,63.692,0.341,41.066,0.341z"
//                     ></path>{" "}
//                     <path
//                       id="XMLID_804_"
//                       d="M230.454,94.761c-24.995,0-43.472,10.745-54.679,22.954V104.73c0-2.761-2.238-5-5-5h-59.599 c-2.762,0-5,2.239-5,5v199.928c0,2.762,2.238,5,5,5h62.097c2.762,0,5-2.238,5-5v-98.918c0-33.333,9.054-46.319,32.29-46.319 c25.306,0,27.317,20.818,27.317,48.034v97.204c0,2.762,2.238,5,5,5H305c2.762,0,5-2.238,5-5V194.995 C310,145.43,300.549,94.761,230.454,94.761z"
//                     ></path>{" "}
//                   </g>{" "}
//                 </g>
//               </svg>
//               <span className="sr-only">LinkedIn account</span>
//             </Link>
//             </div>
//           </div>
//         </div>
        
//         <div className="sm:flex sm:items-center sm:justify-between">
//           <span className="text-sm text-white-200 sm:text-center">
//             © 2023
//             <a
//               href="https://www.linkedin.com/in/debabrata-pal-718614193/"
//               className="hover:underline px-1"
//             >
//               Debabrata Pal.
//             </a>
//             All Rights Reserved.
//           </span>
          
            

            
          
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
