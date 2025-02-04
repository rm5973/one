import React, { useState } from "react";

function Side_Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            <button
                className="p-4 bg-gray-800 text-white"
                onClick={toggleNavbar}
            >
                {isOpen ? <svg class="w-6 h-6 text-white" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> : <svg class="w-6 h-6 text-white" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>}
            </button>

            <div className={`h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <div className="flex justify-between items-center">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">My App</h1>
                </div>
                <button
                    className="p-4 bg-gray-800 text-white"
                    onClick={toggleNavbar}
                >
                    {isOpen ? <svg class="w-6 h-6 text-white" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> : <svg class="w-6 h-6 text-white" fill="white" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>}
                </button>
</div>
                <nav className="mt-10">
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Home
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        About
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Services
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                        Contact
                    </a>
                </nav>
            </div>
        </div>
    );
}

export default Side_Navbar;