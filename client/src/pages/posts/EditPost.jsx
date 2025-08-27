import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import "./Post.css";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/post/${id}`);
        if (!response.ok) throw new Error('Post not found.');
        const postInfo = await response.json();
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files?.[0]) data.set('file', files[0]);

    try {
      const response = await fetch(`http://localhost:4000/posts/post/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to update post.');
      }
      setRedirect(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (redirect) return <Navigate to={`/post/${id}`} />;
  if (loading && !title) return <div className="loading-message">Loading post...</div>;

  return (
    <form className="create-post-form" onSubmit={updatePost}>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        disabled={loading}
      />

      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        disabled={loading}
      />

      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        disabled={loading}
        accept=".png,.jpg,.jpeg,.webp"
      />

      <Editor value={content} onChange={setContent} />

      <button className="submit-btn" disabled={loading}>
        {loading ? 'Updating...' : 'Update post'}
      </button>
    </form>
  );
}
