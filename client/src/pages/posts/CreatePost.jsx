import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import "./Post.css";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleCreatePost(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.set('title', title);
    formData.set('summary', summary);
    formData.set('content', content);
    if (files?.[0]) {
      formData.set('file', files[0]);
    }
if (!title.trim() || !summary.trim()) {
  setError('Please fill in all required fields.');
  return;
}

    try {
      const response = await fetch('http://localhost:4000/posts/post', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create post. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="create-post-form" onSubmit={handleCreatePost}>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        className="form-input"
        required
      />

      <input
        type="text"
        placeholder="Post Summary"
        value={summary}
        onChange={e => setSummary(e.target.value)}
        disabled={loading}
        className="form-input"
        required
      />

      <input
        type="file"
        onChange={e => setFiles(e.target.files)}
        disabled={loading}
        className="form-input file-input"
        accept=".png,.jpg,.jpeg,.webp"
      />

      <Editor value={content} onChange={setContent} />

      <button className="submit-btn" disabled={loading}>
        {loading ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  );
}
