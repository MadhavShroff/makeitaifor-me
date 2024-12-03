import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  description: string;
  upvotes: number;
}

interface Comment {
  id: string;
  content: string;
}

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (id) {
      // fetch post details
      // fetch comments for the post
    }
  }, [id]);

  const handleCommentSubmit = () => {
    // Submit new comment
    // fetch updated comments
  };

  if (!post) return <span className="loading loading-dots loading-lg"></span>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      <div>
        <button onClick={() => axios.post(``)}>
          Upvote
        </button>
        <span>{post.upvotes} Upvotes</span>
      </div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default PostDetail;
