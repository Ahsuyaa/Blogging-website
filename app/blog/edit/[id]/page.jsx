'use client'

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { AiOutlineFileImage } from 'react-icons/ai'

const Edit = (ctx) => {
    const CLOUD_NAME = "dcajyeny0";
    const UPLOAD_PRESET = "blog-website-nextjs";
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("Nature")
    const [photo, setPhoto] = useState("")
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        async function fetchBlog() {
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`)

            const blog = await res.json()

            setTitle(blog.title)
            setDesc(blog.desc)
            setCategory(blog.category)
        }
        fetchBlog()
    }, [])

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return <p className={classes.accessDenied}>
            Access Denied
        </p>
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(title === '' || category === '' || desc === ''){
            toast.error("All fields are required")
            return
        }

        try {
            let imageUrl = null
            if(photo){
                imageUrl = await uploadImage()
            }

            const body = {
                title, 
                desc, category
            }

            if(imageUrl != null){
                body.imageUrl = imageUrl
            }
            
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.params.id}`, {
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${session?.user?.accessToken}`
                },
                method: "PUT",
                body: JSON.stringify(body)
            })

            if(!res.ok){
                throw new Error("Error has occured")
            }

            const blog = await res.json()

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
            <div className="shadow-xl h-[70vh] w-72 shadow-lime-500">
                <h2 className=" text-center m-5 text-[32px] text-black ">Edit Post</h2>
                <form  className="mt-2 flex p-2 border-1-solid rounded-[6px]  flex-col justify-center align-middle" onSubmit={handleSubmit}>
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" value={title} type="text" placeholder='Title...' onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" value={desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)} />
                    <select className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Nature">Nature</option>
                        <option value="Mountain">Mountain</option>
                        <option value="Ocean">Ocean</option>
                        <option value="Wildlife">Wildlife</option>
                        <option value="Forest">Forest</option>
                    </select>
                    <label className='flex m-2' htmlFor='image'>
                        Upload Image <AiOutlineFileImage />
                    </label>
                    <input className="w-full border my-1  border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:border-blue-500" id='image' type="file" onChange={(e) => setPhoto(e.target.files[0])} />
                    <button className="w-full text-lime-600 font-lime-600 rounded-md py-2 px-4 hover:bg-lime-600 hover:text-white">Edit</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Edit