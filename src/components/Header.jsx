import { FaBell, FaCloud } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center bg-white shadow px-4 py-2">
      {/* Left side: "=" button, PIEDAP label, project name */}
      <div className="flex items-center space-x-4">
        {/* Menu button (styled like "=") */}
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 focus:outline-none"
        >
          =
        </button>

        {/* PIEDAP label with green status dot */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-bold text-xl text-[#0B2341]">PIEDAP</span>
        </div>

        {/* Project name (read-only) */}
        <input
          type="text"
          readOnly
          value="P3 project"
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>

      {/* Right side: icons + date/time */}
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
        <FaCloud className="text-gray-600 text-lg cursor-pointer" />
        <span className="text-gray-600">22 Feb 2025 13:22 (UTC+5:30)</span>
      </div>
    </header>
  );
};

export default Header;
