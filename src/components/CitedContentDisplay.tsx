import { useEffect, useRef, useState } from "react";

const graphExample = {
  id: "<base64 id>",
  textContent: [
    {
      line: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quaerat itaque perferendis voluptate saepe unde dignissimos deserunt totam quisquam est cupiditate repudiandae voluptates facilis temporibus iusto animi distinctio rem provident quo sit, minus corrupti!",
    },
    {
      line: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      line: "Ut enim ad minim veniam, quis nostrud exercitation ullamcoUt enim ad minim veniam, quis nostrud exercitation ullamco Ut enim ad minim veniam, quis nostrud exercitation ullamco Ut enim ad minim veniam, quis nostrud exercitation ullamco",
      citation: "https://example.com",
    },
    {
      line: "laboris nisi ut aliquip ex ea commodo consequat.",
      citation: "https://example.com",
    },
  ],
  images: [
    { src: "https://via.placeholder.com/600", alt: "image description" },
    { src: "https://via.placeholder.com/200", alt: "image description" },
    { src: "https://via.placeholder.com/600", alt: "image description" },
    { src: "https://via.placeholder.com/600", alt: "image description" },
    { src: "https://via.placeholder.com/600", alt: "image description" },
    { src: "https://via.placeholder.com/150", alt: "image description" },
    { src: "https://via.placeholder.com/200", alt: "image description" },
  ],
  sources: [
    {
      title:
        "Elon Musk told Nvidia to ship AI chips reserved for Tesla to X, xAI",
      description:
        "Elon Musk directed Nvidia to prioritize sending processors to X and xAI over Tesla, delaying Tesla's receipt of over $500 million",
      publisherName: "cnbc",
      publisherFavicon:
        "https://www.google.com/s2/favicons?sz=128&domain=cnbc.com",
      sourceNumber: 1,
    },
    {
      title:
        "Elon Musk told Nvidia to ship AI chips reserved for Tesla to X, xAI",
      description:
        "Elon Musk directed Nvidia to prioritize sending processors to X and xAI over Tesla, delaying Tesla's receipt of over $500 million",
      publisherName: "cnbc",
      publisherFavicon:
        "https://www.google.com/s2/favicons?sz=128&domain=cnbc.com",
      sourceNumber: 1,
    },
    {
      title:
        "Elon Musk told Nvidia to ship AI chips reserved for Tesla to X, xAI",
      description:
        "Elon Musk directed Nvidia to prioritize sending processors to X and xAI over Tesla, delaying Tesla's receipt of over $500 million",
      publisherName: "cnbc",
      publisherFavicon:
        "https://www.google.com/s2/favicons?sz=128&domain=cnbc.com",
      sourceNumber: 1,
    },
    {
      title:
        "Elon Musk told Nvidia to ship AI chips reserved for Tesla to X, xAI",
      description:
        "Elon Musk directed Nvidia to prioritize sending processors to X and xAI over Tesla, delaying Tesla's receipt of over $500 million",
      publisherName: "cnbc",
      publisherFavicon:
        "https://www.google.com/s2/favicons?sz=128&domain=cnbc.com",
      sourceNumber: 1,
    },
    {
      title:
        "Elon Musk told Nvidia to ship AI chips reserved for Tesla to X, xAI",
      description:
        "Elon Musk directed Nvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X aNvidia to prioritize sending processors to X and xAI over Tesla, delaying Tesla's receipt of over $500 million",
      publisherName: "cnbc",
      publisherFavicon:
        "https://www.google.com/s2/favicons?sz=128&domain=cnbc.com",
      sourceNumber: 1,
    },
  ],
};

//note: change all occurences of graphExample with graph
const OutputComponent = ({ graph }) => {
  const imageContainerRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    if (imageContainerRef.current) {
      const { scrollHeight, clientHeight } = imageContainerRef.current;
      setShowScrollIndicator(scrollHeight > clientHeight);
    }
  }, [graphExample.images]);

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Answer</h2>
      <div className="w-full p-4 flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4 w-full md:order-1">
          <div className="flex flex-col gap-4 mb-6 bg-gray-900 bg-opacity-40 p-4 rounded-md">
            <h2 className="text-xl font-bold w-full">Sources</h2>
            <div className="flex flex-wrap gap-4 mb-6 sm:h-full sm:flex-row sm:overflow-x-scroll">
              {graphExample.sources.map((source) => (
                <div
                  key={source.sourceNumber}
                  className="p-2 rounded-md sm:w-full w-64 h-44 sm:h-fit bg-black overflow-auto"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={source.publisherFavicon}
                      alt={source.publisherName}
                      className="w-6 h-6 mr-2"
                    />
                    <h3 className="font-semibold">{source.publisherName}</h3>
                  </div>
                  <p className="text-sm mb-1">{source.title}</p>
                  <p className="text-xs text-gray-600">{source.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            {graphExample.textContent.map((text, index) => (
              <p key={index} className="mb-2">
                {text.line}
                {text.citation && (
                  <a
                    href={text.citation}
                    className="text-orange-500 ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [#]
                  </a>
                )}
              </p>
            ))}
          </div>
        </div>
        <div className="md:w-1/4 h-fit md:h-screen w-full flex flex-col p-4 bg-orange-500 bg-opacity-70 rounded-md order-1 md:order-2">
          <h2 className="text-xl font-bold mb-4 text-left md:text-right w-full  text-black">
            Images
          </h2>
          <div
            ref={imageContainerRef}
            className="h-full w-full flex md:flex-col overflow-scroll gap-4 items-start relative"
            onScroll={() => setShowScrollIndicator(false)}
          >
            {graphExample.images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt || "image"}
                className="mb-2 max-w-full h-auto rounded-md"
              />
            ))}
            {showScrollIndicator && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black rounded-full p-4 shadow-xl shadow-gray-500 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white animate-bounce"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputComponent;
