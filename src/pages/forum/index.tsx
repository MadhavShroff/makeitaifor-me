import SearchBar from "@/components/forum-page/SearchBar";
import { fetchUser } from "@/utils/fetches";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  description: string;
  upvotes: number;
}

const dummyPosts: Post[] = [
  {
    id: "1",
    title: "First Post",
    description: "This is the first post.",
    upvotes: 5,
  },
  {
    id: "2",
    title: "Second Post",
    description: "This is the second post.",
    upvotes: 10,
  },
  {
    id: "3",
    title: "Third Post",
    description: "This is the third post.",
    upvotes: 3,
  },
  {
    id: "4",
    title: "Fourth Post",
    description: "This is the fourth post.",
    upvotes: 8,
  },
  {
    id: "5",
    title: "Fifth Post",
    description: "This is the fifth post.",
    upvotes: 15,
  },
  {
    id: "6",
    title: "Sixth Post",
    description: "This is the sixth post.",
    upvotes: 7,
  },
  {
    id: "7",
    title: "Seventh Post",
    description: "This is the seventh post.",
    upvotes: 12,
  },
  {
    id: "8",
    title: "Eighth Post",
    description: "This is the eighth post.",
    upvotes: 6,
  },
  {
    id: "9",
    title: "Ninth Post",
    description: "This is the ninth post.",
    upvotes: 4,
  },
  {
    id: "10",
    title: "Tenth Post",
    description: "This is the tenth post.",
    upvotes: 9,
  },
];

const ForumIndex = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [voting, setVoting] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  // Simulate an API call
  useEffect(() => {
    setTimeout(() => {
      setPosts(dummyPosts);
      setLoading(false);
    }, 1000);
  }, []);

  // useEffect(() => {
  //   axios
  //     .get("") //get request ulrl for all posts
  //     .then((response) => {
  //       setPosts(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching posts:", error);
  //       setLoading(false);
  //     });
  // }, []);

  const handleUpvote = async (postId: string) => {
    try {
      // await axios.post(`/api/posts/${postId}/upvote`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error upvoting post:", error);
    }
  };

  const handleDownvote = async (postId: string) => {
    try {
      // await axios.post(`/api/posts/${postId}/downvote`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, upvotes: post.upvotes - 1 } : post
        )
      );
    } catch (error) {
      console.error("Error downvoting post:", error);
    }
  };

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleVote = async (postId: string, type: "upvote" | "downvote") => {
    if (voting[postId]) return;

    setVoting((prev) => ({ ...prev, [postId]: true }));

    try {
      // await axios.post(`/api/posts/${postId}/${type}`);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                upvotes:
                  type === "upvote" ? post.upvotes + 1 : post.upvotes - 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error(`Error ${type}ing post:`, error);
    } finally {
      setVoting((prev) => ({ ...prev, [postId]: false }));
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-black w-full items-center">
      <div className="w-full flex justify-center">
        <nav className="inline-flex items-center bg-orange-500 p-1 flex-wrap rounded-full navsm:rounded mt-3 mx-3">
          <Link
            href="/"
            className="px-2 pr-4 pt-1 text-2xl font-bold text-black hover:underline decoration-black"
          >
            MakeIt<span className="text-white">Ai</span>For.
            <span className="text-white">Me</span>
          </Link>
          <SearchBar onSearch={handleSearch} />
        </nav>
      </div>

      <div className="min-h-screen bg-black text-white p-8 w-[75%]">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold text-orange-500 mb-8">Forum</h1>
          <Link href="/forum/create">
            <button className="bg-orange-500 text-white px-4 py-2 rounded mb-8 hover:bg-orange-600 transition">
              Create a New Post
            </button>
          </Link>
        </div>
        {loading ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          <>
            {posts.length === 0 ? (
              <p className="text-orange-500">
                No posts available. Be the first to create a post!
              </p>
            ) : (
              <ul className="space-y-4">
                {posts
                  .sort((a, b) => b.upvotes - a.upvotes)
                  .map((post) => (
                    <li
                      key={post.id}
                      className="bg-gray-800 p-4 rounded-lg shadow flex items-center"
                    >
                      <div className="flex flex-col items-center mr-4">
                        <button
                          onClick={() => handleVote(post.id, "upvote")}
                          className={`text-green-500 hover:text-green-400 transition ${
                            voting[post.id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={voting[post.id]}
                        >
                          ▲
                        </button>
                        <span className="text-gray-400">{post.upvotes}</span>
                        <button
                          onClick={() => handleVote(post.id, "downvote")}
                          className={`text-red-500 hover:text-red-400 transition ${
                            voting[post.id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={voting[post.id]}
                        >
                          ▼
                        </button>
                      </div>
                      <div className="flex-1">
                        <Link href={`/forum/post-${post.id}`} className="block">
                          <h2 className="text-2xl font-bold text-orange-500">
                            {post.title}
                          </h2>
                          <p className="text-gray-300">{post.description}</p>
                        </Link>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ForumIndex;
