
'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'


const CreateBlog = () => {
    const CLOUD_NAME = "dcajyeny0";
    const UPLOAD_PRESET = "blog-website-nextjs";

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState('')

    const { data: session } = useSession()
    const router = useRouter()


    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p >
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category || !desc){
            toast.error("All fields are required")
            return
        }

        try {
          const imageUrl = await uploadImage()
          
          const res = await fetch(`http://localhost:3000/api/blog`, {
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${session?.user?.accessToken}` 
            },
            method: 'POST',
            body: JSON.stringify({title,desc,category,imageUrl,authorId: session?.user?._id})
          })

          if(!res.ok){
            throw new Error("Error occured")
          }

          const blog = await res.json()
            console.log(blog )
          router.push(`/blog/${blog?._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })

          const data = await res.json()

          const imageUrl = data['secure_url']

          return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-[5rem]   flex justify-center items-center"> 
            <div  className="shadow-xl h-[75vh] w-72 shadow-lime-500">
                <h2 className=" text-center m-5 text-[32px] text-black "> Create Post</h2>
                <form   className="mt-2 flex p-2 border-1-solid rounded-[6px]  flex-col justify-center align-middle" onSubmit={handleSubmit}>
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <label className='flex' htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" id='image' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                  <button  className="w-full text-lime-600 font-lime-600 rounded-md py-2 px-4 hover:bg-lime-600 hover:text-white">Create</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog