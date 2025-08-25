import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import "./Post.css";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files?.[0]) {
      data.set('file', files[0]);
    }

    const response = await fetch('http://localhost:4000/posts/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    
    if (response.ok) {
      setRedirect(true);
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to create post.');
    }
    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={createNewPost}>
      {error && <p className="error">{error}</p>}
      <input 
        type="text" 
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        disabled={loading}
      />
      <input 
        type="text"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        disabled={loading}
      />
      <input 
        type="file"
        onChange={ev => setFiles(ev.target.files)}
        disabled={loading}
      />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }} disabled={loading}>
        {loading ? 'Creating...' : 'Create post'}
      </button>
    </form>
  );
}