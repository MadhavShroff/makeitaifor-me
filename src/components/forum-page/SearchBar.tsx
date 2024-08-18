import React, { useState, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="px-4 py-2 border border-black rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500 bg-black text-white placeholder-gray-500 -mr-px"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-white text-black border border-black rounded-r-full hover:bg-black hover:text-orange-500 focus:outline-none -ml-px"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
