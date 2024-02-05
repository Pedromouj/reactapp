import { HomeIcon } from "@heroicons/react/20/solid";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = () => {
  return (
    <ul className="flex items-center">
      <li className="inline-flex items-center">
        <Link to="/" className="text-gray-600 hover:text-blue-500">
          <HomeIcon className="w-5 h-5 text-gray-400 hover:text-blue-500" />
        </Link>

        <svg
          className="w-5 h-auto fill-current mx-2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </li>

      <li className="inline-flex items-center">
        <Link href="/" className="text-gray-600 hover:text-blue-500">
          Page 1
        </Link>

        <svg
          className="w-5 h-auto fill-current mx-2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
        </svg>
      </li>
    </ul>
  );
};

export default Breadcrumbs;
