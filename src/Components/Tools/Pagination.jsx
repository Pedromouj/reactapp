import React from "react";

function Pagination({ currentPage, handlePageChange, totalePage }) {
  const maxVisiblePages = 5; // Number of visible page buttons
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = currentPage - halfVisiblePages;
  let endPage = currentPage + halfVisiblePages;

  if (startPage < 1) {
    startPage = 1;
    endPage = maxVisiblePages;
  }

  if (endPage > totalePage) {
    endPage = totalePage;
    startPage = endPage - maxVisiblePages + 1;
  }

  const pageButtons = [];

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      i > 0 && (
        <button
          key={i}
          className={`  border shadow w-8 p-1 rounded  ${
            i === currentPage
              ? "bg-slate-100"
              : "bg-white hover:opacity-60 transition-all duration-100 cursor-pointer"
          }`}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      )
    );
  }

  // className=" p-1 rounded hover:opacity-60 transition-all duration-100  cursor-pointer"

  return (
    <div className="flex gap-3 mt-2 justify-center mb-2">
      {currentPage > halfVisiblePages && (
        <button
          className="bg-white border shadow p-1 rounded hover:opacity-60 transition-all duration-100  w-fit cursor-pointer"
          onClick={() => handlePageChange(1)}
        >
          previous
        </button>
      )}

      {currentPage > halfVisiblePages + 1 && (
        <span className="ellipsis font-bold text-lg">...</span>
      )}

      {pageButtons}

      {currentPage < totalePage - halfVisiblePages && (
        <span className="ellipsis font-bold text-lg">...</span>
      )}

      {currentPage < totalePage - halfVisiblePages + 1 && (
        <button
          className="bg-white border shadow p-1 rounded hover:opacity-60 transition-all duration-100 w-8  cursor-pointer"
          onClick={() => handlePageChange(totalePage)}
        >
          {totalePage}
        </button>
      )}
    </div>
  );
}

export default Pagination;
