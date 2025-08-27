import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../../context/UserContext";
import "./Post.css";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
    const navigate = useNavigate();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/post/${id}`);
        if (!response.ok) throw new Error('Post not found.');
        const postData = await response.json();
        setPostInfo(postData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

    async function deletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/posts/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to delete the post.");
        alert("Post deleted successfully!");
        navigate("/");
      } catch (err) {
        alert(err.message);
      }
    }
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!postInfo) return null;

  return (
<div className="post-page-container">
  <h1 className="post-title">{postInfo.title}</h1>

  {postInfo.cover && (
    <div className="post-image">
      <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />
    </div>
  )}

  {postInfo.summary && (
    <div className="post-summary">
      {postInfo.summary}
    </div>
  )}

  <div
    className="post-content"
    dangerouslySetInnerHTML={{ __html: postInfo.content }}
  />

  <div className="post-footer">
    <div className="post-meta">
      <time>{format(new Date(postInfo.createdAt), 'd MMM, yyyy HH:mm')}</time>
      <span className="author">by @{postInfo.author._name}</span>
      {userInfo && postInfo.author && userInfo.id === postInfo.author.id?.toString() && (

            <div className="action-buttons">
              <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
                Edit
              </Link>
              <button onClick={deletePost} className="delete-btn">
                Delete
              </button>
            </div>       
      )}
    </div>
  </div>
</div>


  );
}
