import ReactPaginate from "react-paginate";

export default function Pagination({ total, itemsPerPage, page, setPage }) {
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const p = event.selected;
    setPage(p + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      initialPage={page}
      pageRangeDisplayed={1}
      pageCount={Math.ceil(total / itemsPerPage)}
      previousLabel="<"
      renderOnZeroPageCount={null}
      pageLinkClassName="rounded flex items-start border px-2 py-0.5"
      previousLinkClassName="rounded flex items-start border px-2 py-0.5"
      nextClassName="rounded flex items-start border px-2 py-0.5"
      containerClassName="flex gap-2"
      activeClassName="bg-blue-800 text-white rounded"
    />
  );
}

// const Pagination = () => {
//   return (
//     <div class="relative my-2 text-center">
//       <div class="flex justify-center">
//         <a
//           href="#d"
//           class="px-4 py-2 mx-1 text-gray-500 capitalize bg-white rounded-md cursor-not-allowed"
//         >
//           <div class="flex items-center -mx-1">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="w-6 h-6 mx-1 rtl:-scale-x-100"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M7 16l-4-4m0 0l4-4m-4 4h18"
//               />
//             </svg>

//             <span class="mx-1">previous</span>
//           </div>
//         </a>

//         <a
//           href="#a"
//           class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline"
//         >
//           1
//         </a>

//         <a
//           href="#q"
//           class="hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline"
//         >
//           2
//         </a>
//         <a
//           href="#r"
//           class="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md hover:bg-blue-500 hover:text-white"
//         >
//           <div class="flex items-center -mx-1">
//             <span class="mx-1">Next</span>

//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               class="w-6 h-6 mx-1 rtl:-scale-x-100"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//               />
//             </svg>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };
