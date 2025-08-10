import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import userImage from "../assets/user.png";
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = React.useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been successfully logged out!',
                });
            })
            .catch((error) => console.error(error));
    };

    const navLinkStyle = ({ isActive }) =>
        isActive
            ? 'text-white font-semibold underline'
            : 'text-gray-100 hover:underline';

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-teal-500 shadow">
            <div className="max-w-7xl mx-auto px-13 py-3 flex items-center justify-between">
                <h2 className="font-bold text-2xl text-white">Food Sharing</h2>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Public Routes */}
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/availableFoods" className={navLinkStyle}>Available Foods</NavLink>
                    <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>

                    {/* Dropdown for protected routes */}
                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="text-white hover:underline"
                            >
                                My Dashboard ▾
                            </button>
                            {dropdownOpen && (
                                <div className="absolute top-8 left-0 bg-white text-gray-800 shadow-lg rounded w-48">
                                    <NavLink
                                        to="/manageFoods"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 hover:bg-teal-100"
                                    >
                                        Manage My Foods
                                    </NavLink>
                                    <NavLink
                                        to="/requestFoods"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 hover:bg-teal-100"
                                    >
                                        My Food Requests
                                    </NavLink>
                                    <NavLink
                                        to="/addFood"
                                        onClick={() => setDropdownOpen(false)}
                                        className="block px-4 py-2 hover:bg-teal-100"
                                    >
                                        Add Food
                                    </NavLink>
                                </div>
                            )}

                        </div>
                    )}

                    {/* Theme toggle */}
                    <div className="form-control">
                        <label className="label cursor-pointer gap-2">
                            <span className="text-sm text-white">
                                {theme === 'dark' ? 'Dark' : 'Light'} Mode
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-primary"
                                onChange={toggleTheme}
                                checked={theme === 'dark'}
                            />
                        </label>
                    </div>

                    {/* Auth section */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <img
                                className="w-10 h-10 rounded-full border cursor-pointer"
                                src={user?.photoURL || userImage}
                                alt="User"
                            />
                            {user && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-12 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                                    {user.displayName || "User"}
                                </div>
                            )}
                        </div>

                        {user ? (
                            <button onClick={handleLogOut} className="btn bg-white text-teal-500 px-6">LogOut</button>
                        ) : (
                            <Link to="/auth/login" className="btn bg-white text-teal-500 px-6">Login</Link>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-teal-600 px-4 py-3 space-y-2 flex flex-col text-white">
                    {/* Public Routes */}
                    <NavLink to="/" className={navLinkStyle}>Home</NavLink>
                    <NavLink to="/availableFoods" className={navLinkStyle}>Available Foods</NavLink>
                    <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>

                    {/* Protected Routes in Mobile */}
                    {user && (
                        <>
                            <NavLink to="/manageFoods" className={navLinkStyle}>Manage My Foods</NavLink>
                            <NavLink to="/requestFoods" className={navLinkStyle}>My Food Requests</NavLink>
                            <NavLink to="/addFood" className={navLinkStyle}>Add Food</NavLink>
                        </>
                    )}

                    {/* Theme toggle */}
                    <label className="label cursor-pointer gap-2">
                        <span className="text-sm">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            onChange={toggleTheme}
                            checked={theme === 'dark'}
                        />
                    </label>

                    {/* Auth */}
                    <div className="flex items-center gap-3 mt-4">
                        <img className="w-10 h-10 rounded-full border" src={user?.photoURL || userImage} alt="User" />
                        <span>{user?.displayName || "Guest"}</span>
                    </div>
                    {user ? (
                        <button onClick={handleLogOut} className="btn btn-primary w-full mt-2">LogOut</button>
                    ) : (
                        <Link to="/auth/login" className="btn btn-primary w-full mt-2 text-gray-900">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
