import React from 'react'
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className="w-[40%] mt-10 flex justify-around ml-auto">

            <NavLink
                to="/"
                end
                className={({ isActive }) => {
                    return `w-full text-base text-center font-nunito m-2.5
    	                ${isActive
                            ? "bg-cyan text-gray-300"
                            : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
                        } 
                    border-0 cursor-pointer rounded capitalize font-semibold`;
                }}
            >
                Dashboard
            </NavLink>

            <NavLink
                to="/crypto"
                className={({ isActive }) => {
                    return `w-full text-base text-center font-nunito m-2.5
    	                ${isActive
                            ? "bg-cyan text-gray-300"
                            : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
                        } 
                    border-0 cursor-pointer rounded capitalize font-semibold`;
                }}
            >
                Crypto
            </NavLink>


            <NavLink
                to="/saved"
                className={({ isActive }) => {
                    return `w-full text-base text-center font-nunito m-2.5
    	                ${isActive
                            ? "bg-cyan text-gray-300"
                            : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
                        } 
                    border-0 cursor-pointer rounded capitalize font-semibold`;
                }}
            >
                Saved
            </NavLink>

            <NavLink
                to="/register"
                className={({ isActive }) => {
                    return `w-full text-base text-center font-nunito m-2.5
    	                ${isActive
                            ? "bg-cyan text-gray-300"
                            : "bg-gray-200 text-gray-100hover:text-cyan active:bg-cyan active:text-gray-300"
                        } 
                    border-0 cursor-pointer rounded capitalize font-semibold`;
                }}
            >
                Register
            </NavLink>
        </nav>
    )
}

export default Navigation