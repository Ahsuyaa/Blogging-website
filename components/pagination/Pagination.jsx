// components/pagination/Pagination.js
import React from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <nav className="flex items-center justify-center mt-6">
      {!isFirstPage && (
        <Link href={`/page/${currentPage - 1}`} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-l-md" onClick={() => handlePageClick(currentPage - 1)}>
            Previous
        
        </Link>
      )}

      {!isLastPage && (
        <Link href={`/page/${currentPage + 1}`} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-r-md" onClick={() => handlePageClick(currentPage + 1)}>
            Next
     
        </Link>
      )}
    </nav>
  );
};

export default Pagination;
