'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(username === '' || email === '' || password === ''){
        toast.error("Fill all fields")
        return
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters")
        return
    }

    try {
        const res = await fetch('http://localhost:3000/api/register', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({username, email, password})
        })

        console.log(await res.json())
        if(res.ok){
            toast.success("Successfully registered the user")
           return
        } else {
            toast.error("Error occured while registering")
            return
        }
    } catch (error) {
        console.log(error)
    }
  }

    return (
        <div className="mt-[5rem]   flex justify-center items-center">
            <div  className="shadow-xl h-[70vh] w-72 shadow-lime-500">
                <h2 className=" text-center m-5 text-[32px] text-black ">Register</h2>
                <form   className="mt-2 flex p-2 border-1-solid rounded-[6px]  flex-col justify-center align-middle" onSubmit={handleSubmit}>
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" type="text" placeholder='Username...' onChange={(e) => setUsername(e.target.value)} />
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" type="email" placeholder='Email...' onChange={(e) => setEmail(e.target.value)} />
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" type="password" placeholder='Password...' onChange={(e) => setPassword(e.target.value)} />
                    <button  className="w-full text-lime-600 font-lime-600 rounded-md py-2 px-4 hover:bg-lime-600 hover:text-white">Register</button>
                    <button  onClick={() => signIn()}>
                        Don't have an account? <br /> Register now.
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Register