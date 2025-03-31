import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [activeTab, setActiveTab] = useState("movie");
	const [searchTerm, setSearchTerm] = useState("");
	const [results, setResults] = useState([]);
	const { setContentType } = useContentStore();

	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
		setResults([]);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setResults(res.data.content);
		} catch (error) {
			if (error.response?.status === 404) {
				toast.error("Nothing found, check the category.");
			} else {
				toast.error("An error occurred, try again.");
			}
		}
	};

	return (
		<div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white flex flex-col">
			<Navbar />

			<div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
				<h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
					🔎 Search for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
				</h1>

				{/* Tab Selector */}
				<div className="flex justify-center gap-4 mb-6">
					{["movie", "tv", "person"].map((tab) => (
						<button
							key={tab}
							className={`px-6 py-2 text-lg font-semibold rounded-full transition-all ${
								activeTab === tab
									? "bg-red-600 text-white shadow-md scale-105"
									: "bg-gray-800 text-gray-300 hover:bg-red-700 hover:text-white"
							}`}
							onClick={() => handleTabClick(tab)}
						>
							{tab.charAt(0).toUpperCase() + tab.slice(1)}
						</button>
					))}
				</div>

				{/* Search Bar */}
				<form className="flex gap-2 items-center max-w-lg w-full mx-auto mb-10" onSubmit={handleSearch}>
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={`Search for a ${activeTab}...`}
						className="w-full p-3 rounded-full bg-gray-800 text-white border-2 border-gray-700 focus:ring-2 focus:ring-red-600 text-center"
					/>
					<button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all">
						<Search className="size-6" />
					</button>
				</form>

				{/* Results Grid */}
				<div className="w-full max-w-6xl mx-auto">
					{results.length === 0 ? (
						<p className="text-center text-gray-400 text-xl animate-pulse">No results found. 😢</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{results.map((result) => {
								if (!result.poster_path && !result.profile_path) return null;

								return (
									<div
										key={result.id}
										className="group relative bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-5 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-2xl hover:border-red-500 hover:scale-105"
									>
										{/* Image with pop-out effect */}
										<img
											src={
												activeTab === "person"
													? ORIGINAL_IMG_BASE_URL + result.profile_path
													: ORIGINAL_IMG_BASE_URL + result.poster_path
											}
											alt={result.name || result.title}
											className="w-full h-auto rounded-lg transition-all duration-500 group-hover:scale-105"
										/>

										{/* Content */}
										<div className="mt-4 text-center">
											<h2 className="text-xl font-semibold group-hover:text-red-400 transition">
												{result.title || result.name}
											</h2>
										</div>

										{/* Overlay with link */}
										{activeTab !== "person" && (
											<Link
												to={"/watch/" + result.id}
												onClick={() => setContentType(activeTab)}
												className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"
											></Link>
										)}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
