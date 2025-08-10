import React from 'react';
import { FaYoutube, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-white font-semibold underline'
            : 'text-teal-200 hover:underline';

    return (
        <footer className="bg-teal-500 text-teal-100 py-6 rounded-t-lg mt-12 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand */}
                <div className="text-2xl font-bold text-white">
                    Food Sharing
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-wrap gap-6 justify-center md:justify-start">
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/availableFoods" className={navLinkStyle}>Available Foods</NavLink>
                    <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
                    <NavLink to="/manageFoods" className={navLinkStyle}>Manage My Foods</NavLink>
                    <NavLink to="/requestFoods" className={navLinkStyle}>My Food Requests</NavLink>
                    <NavLink to="/addFood" className={navLinkStyle}>Add Food</NavLink>
                </nav>

                {/* Social Icons */}
                <div className="flex gap-4">
                    <a
                        href="https://www.facebook.com/rubayetalam21/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center rounded-full w-10 h-10 border border-teal-200 text-teal-200 hover:bg-white hover:text-teal-600 transition"
                        aria-label="Facebook"
                    >
                        <FaFacebook size={20} />
                    </a>
                    <a
                        href="https://www.youtube.com/@shahmuhammadrubayetalam4747"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center rounded-full w-10 h-10 border border-teal-200 text-teal-200 hover:bg-white hover:text-teal-600 transition"
                        aria-label="YouTube"
                    >
                        <FaYoutube size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/smrubayetalam/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center rounded-full w-10 h-10 border border-teal-200 text-teal-200 hover:bg-white hover:text-teal-600 transition"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={20} />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-6 text-center text-teal-200 text-sm select-none">
                &copy; {new Date().getFullYear()} Food Sharing. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
