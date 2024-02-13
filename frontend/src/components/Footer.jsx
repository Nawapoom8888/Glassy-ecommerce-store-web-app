import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="h-20 w-full bg-neutral-800 text-gray-100">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-center px-6">
        &copy; {currentYear} Glassy. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
