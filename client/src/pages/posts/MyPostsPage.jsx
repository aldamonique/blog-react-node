// Em src/pages/posts/MyPostsPage.jsx
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Post from "../../components/posts/Post";
import './MyPost.css'; 
export default function MyPostsPage() {
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/posts/my-posts", { 
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not fetch posts. Are you logged in?');
        }
        return res.json();
      })
      .then(data => {
        setMyPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading posts:", err);
        setLoading(false);
      });
  }, []);

  async function handleDelete(postId) {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        const response = await fetch(`http://localhost:4000/posts/${postId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            setMyPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        } else {
            alert('Failed to delete post.');
        }
    }
  }

  if (loading) {
    return <div className="my-posts-page"><h2>Loading your posts...</h2></div>;
  }

  return (
    <div className="my-posts-page">
      <h2 className="tittle">My Posts</h2>
      {myPosts.length > 0 ? (
        <div className="posts-grid">
          {myPosts.map(post => (
            <div key={post._id} className="post-container">
              <Post {...post} />

              <div className="post-actions">
                  <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>
                  <button onClick={() => handleDelete(post._id)} className="delete-btn">
                      Delete
                  </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any posts yet. <Link to="/create">Create one now!</Link></p>
      )}
    </div>
  );
}