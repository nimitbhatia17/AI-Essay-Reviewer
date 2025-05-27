// "use client";

// import React from "react";
// import { useState } from "react";

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       window.location.href = `/search?query=${encodeURIComponent(
//         searchQuery.trim()
//       )}`;
//     }
//   };

//   return (
//     <div className="flex-1 max-w-md mx-6">
//       <form onSubmit={handleSearch} className="relative">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           placeholder="Search colleges or topics..."
//           className="w-full px-4 py-2 text-gray-700 bg-color-e rounded-lg text-medium focus:outline-none focus:ring-1 focus:ring-color-c"
//         />
//         <button
//           type="submit"
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-color-c"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchBar;
