'use client'
import { useEffect, useState } from 'react';
import { chunk } from 'lodash';
import BlogCard from '../components/blogcard/BlogCard';

const itemsPerPage = 9; // Number of blogs to display per page
export async function fetchBlogs()
{
  const res = await fetch('http://localhost:3000/api/blog',{cache:'no-store'})
  return res.json()
}
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await fetchBlogs();
      setBlogs(fetchedBlogs);
    };

    fetchData();
  }, []);

  const paginatedBlogs = chunk(blogs, itemsPerPage);
  const currentBlogs = paginatedBlogs[currentPage - 1] || [];

  return (
    <div className="w-full">
      <div className="mx-20 mt-10">
        {currentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
              
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <h3>No blogs are currently available.</h3>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-8">
        {paginatedBlogs.length > 1 &&
          Array.from({ length: paginatedBlogs.length }).map((_, index) => (
            <button
              key={index}
              className={`mx-1 px-2 py-1 rounded ${
                currentPage === index + 1 ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}
