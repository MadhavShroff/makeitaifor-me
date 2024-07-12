import React, { useState } from "react";
import { fetchGoogleSearchModuleResult } from "@/utils/fetches";

interface SearchResult {
  results: Record<string, string>;
  images: string[];
}

function GoogleSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Changed initial state to false

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const query = searchQuery.trim(); 
      if (!query) return;
      setIsLoading(true);
      setSearchResult(null);
      try {
        const result: SearchResult = await fetchGoogleSearchModuleResult(
          query,
          4
        );
        setSearchResult(result);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is always set to false
      }
    }
  };

  //function to extract title from content
  const getTitle = (content: string): string => {
    const regex = /Title: (.*?)\n\n/;
    const match = content.match(regex);
    return match ? match[1] : "";
  };

  //function to limit content to 30 words
  const limitContent = (content: string): string => {
    const words = content.split(" ");
    return words.length > 50 ? `${words.slice(0, 30).join(" ")}...` : content;
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResult(null);
    setIsLoading(false);
  };

  return (
    <section
      id="section1"
      className="md:h-screen bg-orange-500 mt-4 mb-20 rounded p-4 md:pb-20"
    >
      <h1 className="text-3xl pb-6 text-black">Google Search Module</h1>
      <div className="flex flex-col gap-8 p-4 h-full">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eos
          dolorem iure ipsum officia mollitia assumenda at vel porro dolore?
          Minima laborum totam accusantium, harum consequuntur id! Impedit
          corrupti libero tenetur doloremque adipisci reiciendis velit alias
          debitis laudantium, totam recusandae.
        </p>

        {/* Browser overlay */}
        <div className="mockup-browser border-base-300 bg-gray-900 border h-full overflow-y-auto z-0">
          <div className="mockup-browser-toolbar flex justify-between p-2">
            <label className="input input-bordered flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                className="grow outline-none"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-100 m-1"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button className="btn btn-sm btn-error" onClick={handleClear}>
              clear
            </button>
          </div>

          {/* Browser content */}
          <div className="border-base-300 flex flex-wrap justify-center border-t p-4 text-black">
            {isLoading ? (
              <span className="loading loading-dots loading-lg flex justify-center py-16"></span>
            ) : searchResult ? (
              Object.entries(searchResult.results).map(
                ([url, content], index) => (
                  <div
                    key={url}
                    className="card lg:card-side bg-base-100 shadow-xl m-4 w-full md:w-auto"
                  >
                    <figure className="w-full h-48 md:w-48 md:h-auto">
                      {searchResult.images[index] ? (
                        <img
                          src={searchResult.images[index]}
                          alt="Search result"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          No Image Available
                        </div>
                      )}
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title">{getTitle(content)}</h1>
                      <a className="text-orange-500 hover:underline" href={url}>
                        {url}
                      </a>
                      <p>{limitContent(content)}</p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="flex justify-center py-16 text-white">Hello!</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoogleSearch;
