"use client";

import React from "react";
import { FaHome } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { usePathname } from "next/navigation"; // Use next/navigation instead
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path

  // A utility function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className=" bg-[#2DA64D]">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold text-white">
            Petal Post
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="px-1 flex justify-center items-center gap-32">
            <Link href="/">
              <li className={isActive("/") ? "border-b-4 border-b-[#9EF01A] w-12 p-2" : ""}>
                <FaHome className="text-white text-2xl w-full mx-auto" />
              </li>
            </Link>
            <Link href="/followers">
              <li className={isActive("/followers") ? "border-b-4 border-b-[#9EF01A] w-12 p-2" : ""}>
                <IoIosPeople className="text-white text-2xl w-full mx-auto" />
              </li>
            </Link>
            
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-[#70e000] border-0 hover:bg-[#9ef01a]">
            Join Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
