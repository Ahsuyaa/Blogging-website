"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { format } from "timeago.js";

import { useRouter } from "next/navigation";
const BlogDetail = (ctx) => {
  const [blogDetail, setBlogDetails] = useState("");
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState([])
  const { data: session } = useSession();
  useEffect(() => {
    async function fetchComments(){
      const res = await fetch(`http://localhost:3000/api/comment/${ctx.params.id}`, {cache: 'no-store'})
      const comments = await res.json()

      setComments(comments)
      console.log(comments);
    }
    fetchComments()
  }, [])

  useEffect(() => {
    async function fetchBlog() {
      const res = await fetch(
        `http://localhost:3000/api/blog/${ctx.params.id}`,
        { cache: "no-store" }
      );
      const blog = await res.json();
      setBlogDetails(blog);
    }
   fetchBlog();
  },[session]);


  const handleDelete = async () => {
    try {
      const confirmModal = confirm(
        "Are you sure you want to delete your blog?"
      );

      if (confirmModal) {
        const res = await fetch(
          `http://localhost:3000/api/blog/${ctx.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user?.accessToken}`,
            },
            method: "DELETE",
          }
        );

        if (res.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComment = async () => {
    if(commentText?.length < 2){
        toast.error("Comment must be at least 2 characters long")
        return
    }

    try {
        const body = {
            blogId: ctx.params.id,
            authorId: session?.user?._id,
            text: commentText
        }

        const res = await fetch(`http://localhost:3000/api/comment`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.accessToken}`
            },
            method: "POST",
            body: JSON.stringify(body)
        })

        const newComment = await res.json()

        setComments((prev) => {
            return [newComment, prev]
        })
        
        setCommentText("")
    } catch (error) {
        console.log(error)
    }
}
const dateString = blogDetail?.createdAt;
const dateObj = new Date(dateString);
const formattedDate = dateObj.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
});

  return (
    <div className="flex justify-center items-center">
      <div className="w-[50%] h-[100%] m-0 mt-[5rem] flex flex-col align-middle">
        <Image src={blogDetail?.imageUrl} width={"750"} height={"650"} />
        <div className="flex justify-between m-2 mt-5">
          <h3 className="text-3xl font-s]">{blogDetail?.title}</h3>
          {blogDetail?.authorId?._id.toString() ===
          session?.user?._id.toString() ? (
            <div className="flex justify-end">
              <Link
                className="flex bg-green-500 rounded-[8px] p-2 "
                href={`blog/edit/${ctx.params.id}`}
              >
                Edit{" "}
                <span
                  className="p-1 text-sm
                "
                >
                  <BsFillPencilFill />
                </span>
              </Link>
              <button
                className="flex ml-6  bg-red-500 rounded-[8px] p-2"
                onClick={handleDelete}
              >
                Delete{" "}
                <span
                  className="p-1 text-sm
                "
                >
                  <AiFillDelete />
                </span>
              </button>
            </div>
          ) : 
          (
            <div>
              Author :<span> {blogDetail?.authorId?.username}</span>
            </div>
          )}
        </div>
        <div className="flex  m-2">
          <div className="font-bold">
            Category:
            <span>{blogDetail?.category}</span>
          </div>
        </div>
        <div className="flex justify-between m-2">
          <p>{blogDetail?.desc}</p>
          <span>
            Posted:<span>{formattedDate }</span>
          </span>
        </div>
        <div className="m-0 mt-10 w-[100%] flex flex-col justify-center  text-center rounded-[10px] ">
                    <div className="flex justify-between" >
                        <input className="p-[1rem] w-[100%] flex align-middle gap-[1.5rem]  border-4 border-solid"
                      value={commentText} type="text" placeholder='Type message...' onChange={(e) => setCommentText(e.target.value)}/>
                        <button className="cursor-pointer justify-end m-5 bg-blue-400 rounded-md p-2" onClick={handleComment}>Post</button>
                    </div>
                    <div>
                        {
                            comments?.length > 0
                            ? comments.map((comment) => (
                                <Comment key={comment?._id} comment={comment} setComments={setComments}/>
                            ))
                            : <h4 >No comments. Be the first one to leave a comment!</h4>
                        }
                    </div>
                </div>
      </div>
    </div>
  );
};

export default BlogDetail;
