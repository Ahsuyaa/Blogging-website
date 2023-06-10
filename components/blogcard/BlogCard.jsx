'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSession } from 'next-auth/react'


const BlogCard = ({ blog: { title, desc, imageUrl,  authorId, _id ,createdAt} }) =>{

  const dateString = createdAt;
  const dateObj = new Date(dateString);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return (
    <>
      <div className=" shadow-md rounded-[12px] hover:shadow-lime-600">
        <div className="p-[1.25rem] w-[100%] h-[100%] flex flex-col">
          <Link className="" href={`/blog/${_id}`}>
            <Image
              className="object-cover rounded-[20px] sm:h-[200px] m-auto sm:w-[400px]"
              src={imageUrl} 
              width="350"
              height="450"
            />
            
          </Link>
          <div className="ml-[0.75 rem] flex justify-between align-middle">
            <div>
              <h3 className=" text-[15px] sm:text-[28px] font-bold mt-[1.5rem] mb-[1.25rem]">
                {title}
              </h3>
              <p className="text-[20px]">{desc.slice(0,100)}</p>

              <span className="mt-[1rem] flex align-middle gap-[0.5rem] text-[8px] sm:text-[15px]">
                {" "}
                Created at :<span className="text-[#666]">{formattedDate}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
