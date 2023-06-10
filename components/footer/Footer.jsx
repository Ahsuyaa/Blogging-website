import React from "react";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  

  return (
    <>
      <div className="grid md:grid-cols-3 mt-10 mx-20">
        <div className="text-center m-2">
          <h2 className="font-bold">About this app</h2>
            <p>
            This website is a platform where individuals or organizations can publish and share their written content with an online audience. It serves as a medium for expressing thoughts, ideas, opinions, experiences, and expertise on various topics.
            </p>

        </div>
        <div className="text-center m-2">
        <h2 className="font-bold">Contact </h2>
         <ul>
            <li>
              <label>Number:</label><span>9849000000</span>
            </li>
            <li>
            <label>Email:</label><span>aayusha123@gmail.com</span>
            </li>
            <li className="inline-flex mt-5">
            <p className="text-xl text-rose-500 mr-2"><AiFillInstagram/></p><p className="text-xl text-blue-500 mr-2"><AiFillFacebook/></p><p className="text=xl text-blue-500"><AiOutlineTwitter/></p>
            </li>

         </ul>
        </div>
        <div className="text-center m-2">
        <h2 className="font-bold">Location</h2>
        <p>Charikot,Dolakha</p>

        </div>
      </div>
    </>
  );
};

export default Footer;
