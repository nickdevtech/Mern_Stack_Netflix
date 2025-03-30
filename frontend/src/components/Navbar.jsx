// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { LogOut, Menu, Search } from "lucide-react";
// import { useAuthStore } from "../store/authUser";
// import { useContentStore } from "../store/content";

// const Navbar = () => {
// 	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// 	const { user, logout } = useAuthStore();

// 	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

// 	const { setContentType } = useContentStore();

// 	return (
// 		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
// 			<div className='flex items-center gap-10 z-50'>
// 				<Link to='/'>
// 					<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
// 				</Link>

// 				{/* desktop navbar items */}
// 				<div className='hidden sm:flex gap-2 items-center'>
// 					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
// 						Movies
// 					</Link>
// 					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
// 						Tv Shows
// 					</Link>
// 					<Link to='/history' className='hover:underline'>
// 						Search History
// 					</Link>
// 				</div>
// 			</div>

// 			<div className='flex gap-2 items-center z-50'>
// 				<Link to={"/search"}>
// 					<Search className='size-6 cursor-pointer' />
// 				</Link>
// 				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
// 				<LogOut className='size-6 cursor-pointer' onClick={logout} />
// 				<div className='sm:hidden'>
// 					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
// 				</div>
// 			</div>

// 			{/* mobile navbar items */}
// 			{isMobileMenuOpen && (
// 				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
// 					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
// 						Movies
// 					</Link>
// 					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
// 						Tv Shows
// 					</Link>
// 					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
// 						Search History
// 					</Link>
// 				</div>
// 			)}
// 		</header>
// 	);
// };
// export default Navbar;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolling, setScrolling] = useState(false);
	const { user, logout } = useAuthStore();
	const { setContentType } = useContentStore();

	// Detect scroll position
	useEffect(() => {
		const handleScroll = () => {
			setScrolling(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				scrolling ? "bg-black/70 backdrop-blur-lg shadow-md" : "bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
				{/* Logo & Desktop Navigation */}
				<div className="flex items-center gap-10">
					<Link to="/">
						<img
							src="/netflix-logo.png"
							alt="Netflix Logo"
							className="w-36 sm:w-44 transition-transform hover:scale-110"
						/>
					</Link>

					{/* Desktop Menu */}
					<nav className="hidden sm:flex gap-6 text-lg font-medium text-white">
						<Link
							to="/"
							className="relative group hover:text-red-500 transition-all"
							onClick={() => setContentType("movie")}
						>
							Movies
							<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link
							to="/"
							className="relative group hover:text-red-500 transition-all"
							onClick={() => setContentType("tv")}
						>
							TV Shows
							<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
						</Link>
						<Link to="/history" className="relative group hover:text-red-500 transition-all">
							Search History
							<span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
						</Link>
					</nav>
				</div>

				{/* Right Side (Search, Avatar, Logout, Mobile Menu) */}
				<div className="flex items-center gap-4 text-white">
					{/* Search Icon */}
					<Link to="/search" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all">
						<Search className="size-6 text-gray-300 hover:text-white transition-all" />
					</Link>

					{/* User Avatar */}
					<img
						src={user.image}
						alt="Avatar"
						className="h-10 w-10 rounded-full border border-gray-500 shadow-md cursor-pointer hover:opacity-80 transition-all"
					/>

					{/* Logout Button */}
					<button
						onClick={logout}
						className="p-2 rounded-full bg-gray-800 hover:bg-red-600 transition-all"
					>
						<LogOut className="size-6 text-gray-300 hover:text-white transition-all" />
					</button>

					{/* Mobile Menu Icon */}
					<div className="sm:hidden">
						<Menu className="size-6 cursor-pointer hover:text-red-500 transition-all" onClick={toggleMobileMenu} />
					</div>
				</div>
			</div>

			{/* Mobile Menu (Slide & Fade Animation) */}
			<div
				className={`absolute top-20 left-0 w-full transition-all duration-500 ${
					isMobileMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
				} bg-black/90 backdrop-blur-md text-white p-6 rounded-b-lg shadow-lg sm:hidden`}
			>
				<Link to="/" className="block py-3 text-lg hover:text-red-500 transition-all" onClick={toggleMobileMenu}>
					Movies
				</Link>
				<Link to="/" className="block py-3 text-lg hover:text-red-500 transition-all" onClick={toggleMobileMenu}>
					TV Shows
				</Link>
				<Link to="/history" className="block py-3 text-lg hover:text-red-500 transition-all" onClick={toggleMobileMenu}>
					Search History
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
