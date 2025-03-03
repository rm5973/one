// Sidebar.jsx
import React, { useState } from "react";
import { SIDEBAR_ITEMS } from "../SidebarData";

export default function Sidebar({ isOpen, activePage, setActivePage }) {
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle submenu expansion and set main label as active.
  const handleItemClick = (index, itemKey) => {
    setOpenIndex((prev) => (prev === index ? null : index));
    setActivePage(itemKey);
  };

  return (
    <div
      className={`absolute top-0 left-0 h-full bg-[#0B2341] text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-0"
      } overflow-x-hidden`}
    >
      {isOpen && (
        <div className="p-5">
          <h2 className="text-xl font-bold text-[#5EC3F2]">PIEDAP</h2>
          <nav className="mt-5 space-y-2">
            {SIDEBAR_ITEMS.map((item, i) => (
              <SidebarItem
                key={item.key}
                item={item}
                isOpen={openIndex === i}
                onClick={() => handleItemClick(i, item.key)}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ item, isOpen, onClick, activePage, setActivePage }) {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  // Render the icon by using the component reference
  const Icon = item.icon;

  return (
    <div>
      <div
        className={`flex items-center space-x-3 cursor-pointer p-1 ${
          activePage === item.key
            ? "underline text-white"
            : "text-gray-300 hover:text-white"
        }`}
        onClick={onClick}
      >
        <span className="text-lg">
          <Icon />
        </span>
        <span className="text-sm">{item.label}</span>
      </div>
      {hasSubItems && isOpen && (
        <div className="pl-6 mt-1 space-y-2 border-l border-gray-500">
          {item.subItems.map((sub) => (
            <div
              key={sub.key}
              className={`pl-2 cursor-pointer flex items-center p-1 ${
                activePage === sub.key
                  ? "border-l-4 border-green-500"
                  : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setActivePage(sub.key)}
            >
              {sub.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
