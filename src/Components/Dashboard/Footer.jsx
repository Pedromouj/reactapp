import React from "react";

function Footer() {
  return (
    <footer className="w-full shadow-lg p-3 text-end border-t  bg-[#1f263e]  text-white">
      &copy; PICOD {new Date().getFullYear()} - All rights reserved.
    </footer>
  );
}

export default Footer;
