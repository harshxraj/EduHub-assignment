// SideNav.js
import React from "react";

const SideNav = () => {
  return (
    <div className="bg-gray-200 h-screen w-64 fixed top-0 left-0 overflow-y-auto">
      <ul className="pt-8">
        <li>
          <a href="/page1" className="block px-4 py-2">
            Page 1
          </a>
        </li>
        <li>
          <a href="/page2" className="block px-4 py-2">
            Page 2
          </a>
        </li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default SideNav;
