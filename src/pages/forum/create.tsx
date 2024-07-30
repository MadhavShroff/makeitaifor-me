import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("", { title, description }); //add post route
      router.push("/forum");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-8">
        Create a New Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-400 mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 bg-gray-800 text-white rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-400 mb-2">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 bg-gray-800 text-white rounded h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
