"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {FaChevronCircleDown} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import person from "../../public/person.png";
import {signIn,signOut, useSession} from 'next-auth/react'
const NavBar = () => {
  const [showDropdown, SetShowdropdown] = useState(false);
  const handleShowDropdown = () => SetShowdropdown((prev) => true);
  const {data:session}=useSession()
  const handlehideDropdown = () => SetShowdropdown((prv) => false);

 
  return (
    
    <div className="sticky top-0 z-50 h-[60px] w-[100%] bg-white flex justify-center align-middle left-0 ">
      <div className="w-[85%] relative m-auto flex justify-between align-middle">
        <h2 className="font-[36px] text-green-700 m-5">
          <Link href="/">Coder चेली</Link>
        </h2>
        <ul className=" flex align-middle gap-[1.25rem]">
          {
          session?.user
          ? (
            <div className="m-2">
              
                <Image
                  className="w-16 h-16 rounded-full overflow-hidden"
                  onClick={handleShowDropdown}
                  src={person}
                  width="45"
                  height="45"
                  alt="img" 
                />
              
                {showDropdown && (
                  <div className=" absolute bg-white p-2 flex flex-col align-middle gap-2 top-[2.5rem] m-2 rounded-[8px] shadow-lg">
                    <AiOutlineClose className=" absolute top-[0.3rem] right-[0.3rem] " onClick={handlehideDropdown} />
                    <button onClick={()=>{signOut();handlehideDropdown()}} className="sm:ml-[1rem] sm:mr-[1rem]  mt-5 p-[1rem] text-white rounded-[10px] font-bold text-[10px] bg-green-700">
                      {" "}
                      Logout
                    </button>
                    <Link
                      onClick={handlehideDropdown}
                      href="/create-blog"
                      className="text-gray-700 text-[12px] font-medium p-2 sm:ml-[1rem]"
                    >
                      Create{" "}
                    </Link>
                  </div>
                )}
              </div>
           
          ) : (
          <>
          <button onClick={()=>{signIn()}} className="m-2 p-2 text-[10px] md:text-[17px] bg-green-700 text-white rounded-[8px]">Log in</button>
          <Link href='/register' className="p-2 m-2">Register</Link>
          </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
