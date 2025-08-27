import { useSearchParams } from "react-router-dom";
import Post from '../../components/posts/Post.jsx'
import { useEffect, useState } from "react";
import './SearchPage.css';
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/posts/post")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const results = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.summary.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(results);
    }
  }, [query, posts]);

  return (
    <div className="grid-card">
      <h2>Results for: "{query}"</h2>
      <div className="card-search">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post key={post._id} {...post} />)
      ) : (
        <p>No posts found.</p>
      )}

      </div>

    </div>
  );
}

