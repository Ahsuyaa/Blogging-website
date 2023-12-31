import React from 'react'
import {useSession} from 'next-auth/react'
import {format} from 'timeago.js'
import person from '../../../public/person.jpg'
import {BsTrash} from 'react-icons/bs'
import classes from './comment.module.css'
import Image from 'next/image'

const Comment = ({comment, setComments}) => {
  const {data: session} = useSession()
  const token = session?.user?.accessToken

  const handleDeleteComment = async() => {
    try {
      await fetch(`https://blog-nextjs-13-sud5.vercel.app/api/comment/${comment?._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        method: "DELETE"
      })

      setComments(prev => {
        return [...prev].filter((c) => c?._id !== comment?._id)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <div >
        <div >
            
             <div >
               <h4>{comment?.authorId?.username}</h4>
               <span >{format(comment?.createdAt)}</span>
             </div>
             <span>{comment?.text}</span>
        </div>
        <div>
           {session?.user?._id === comment?.authorId?._id && (
             <BsTrash onClick={handleDeleteComment} />
           )}
        </div>
      </div>
    </div>
  )
}

export default Comment