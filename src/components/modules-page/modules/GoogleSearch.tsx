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
      const query = searchQuery.trim(); // Trim whitespace from the query
      if (!query) return; // Exit early if query is empty
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
      className="h-screen bg-[#FFA500] mb-4 rounded p-4 pb-20"
    >
      <h1 className="text-3xl pb-6">Google Search Module</h1>
      <div className="flex flex-col gap-8 p-4 h-full">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eos
          dolorem iure ipsum officia mollitia assumenda at vel porro dolore?
          Minima laborum totam accusantium, harum consequuntur id! Impedit
          corrupti libero tenetur doloremque adipisci reiciendis velit alias
          debitis laudantium, totam recusandae.
        </p>

        {/* Browser overlay */}
        <div className="mockup-browser border-base-300 bg-gray-900 border h-full overflow-y-auto">
          <div className="mockup-browser-toolbar flex justify-between">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ outline: "none" }}
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
          <div className="border-base-300 flex flex-wrap justify-center border-t px-4 py-16 text-black">
            {isLoading ? (
              <span className="loading loading-dots loading-lg flex justify-center px-4 py-28"></span>
            ) : searchResult ? (
              Object.entries(searchResult.results).map(
                ([url, content], index) => (
                  <div className="card lg:card-side bg-base-100 shadow-xl m-4">
                    <figure style={{ width: "100%", height: "200px" }}>
                      {searchResult.images[index] ? (
                        <img
                          src={searchResult.images[index]}
                          alt="Search result"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%" }}>
                          No Image Available
                        </div>
                      )}
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title">{getTitle(content)}</h1>
                      <a className="text-blue-600 hover:underline" href={url}>
                        {url}
                      </a>
                      <p>{limitContent(content)}</p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="flex justify-center px-4 py-28 text-white">
                Hello!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoogleSearch;
