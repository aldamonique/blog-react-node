import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../../components/editor/Editor";


export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state for initial fetch
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/post/${id}`);
        if (!response.ok) {
          throw new Error('Post not found or failed to fetch.');
        }
        const postInfo = await response.json();
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
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
    if (files?.[0]) {
      data.set('file', files[0]);
    }

    const response = await fetch(`http://localhost:4000/posts/post/${id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    
    if (response.ok) {
      setRedirect(true);
    } else {
      const errorData = await response.json();
      setError(errorData.error || 'Failed to update post.');
    }
    setLoading(false);
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  
  if (loading && !title) { 
      return <div>Loading post...</div>;
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }} disabled={loading}>
        {loading ? 'Updating...' : 'Update post'}
      </button>
    </form>
  );
}