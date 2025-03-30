import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

const SearchHistoryPage = () => {
	const [searchHistory, setSearchHistory] = useState([]);

	useEffect(() => {
		const getSearchHistory = async () => {
			try {
				const res = await axios.get(`/api/v1/search/history`);
				setSearchHistory(res.data.content);
			} catch (error) {
				setSearchHistory([]);
			}
		};
		getSearchHistory();
	}, []);

	const handleDelete = async (entry) => {
		try {
			await axios.delete(`/api/v1/search/history/${entry.id}`);
			setSearchHistory((prev) => prev.filter((item) => item.id !== entry.id));
			toast.success("Search item deleted", { icon: "🗑️" });
		} catch (error) {
			toast.error("Failed to delete search item");
		}
	};

	return (
		<div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen flex flex-col">
			<Navbar />

			<div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
				<h1 className="text-4xl font-bold mb-8 tracking-wide text-center bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
					🔍 Search History
				</h1>

				{/* Empty State */}
				{searchHistory.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-96">
						<p className="text-xl text-gray-400 animate-pulse">No search history found 😢</p>
					</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 max-w-6xl mx-auto">
						{searchHistory.map((entry) => (
							<div
								key={entry.id}
								className="group relative bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-red-500"
							>
								{/* Image */}
								<img
									src={SMALL_IMG_BASE_URL + entry.image}
									alt="History"
									className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-4 group-hover:border-red-500"
								/>

								{/* Content */}
								<div className="pt-16 pb-6 text-center">
									<span className="block text-lg font-semibold">{entry.title}</span>
									<p className="text-sm text-gray-400 mt-2">{formatDate(entry.createdAt)}</p>
								</div>

								{/* Search Type Tag */}
								<span
									className={`absolute bottom-4 left-1/2 -translate-x-1/2 py-1 px-4 rounded-full text-xs font-semibold tracking-wider text-white transition-all ${
										entry.searchType === "movie"
											? "bg-gradient-to-r from-red-500 to-orange-500"
											: entry.searchType === "tv"
											? "bg-gradient-to-r from-blue-500 to-indigo-500"
											: "bg-gradient-to-r from-green-500 to-teal-500"
									}`}
								>
									{entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
								</span>

								{/* Delete Button */}
								<button
									onClick={() => handleDelete(entry)}
									className="absolute top-4 right-4 size-7 text-gray-400 hover:text-red-500 transition-all duration-300 opacity-80 hover:opacity-100"
								>
									<Trash />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchHistoryPage;
