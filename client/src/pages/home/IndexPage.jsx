import Post from "../../components/posts/Post";
import {useEffect, useState} from "react";
import './IndexPage.css'

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/posts/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);


  const latestPosts = posts.slice(0,5);
  const featuredPosts = posts.slice(1, 3);
  const otherPosts = posts.slice(6);

  return (
    <><div className="lines">
     <hr className="line" style={{ height: "1px", color:'black'}} />
    </div>
  <div className="home-layout">

  <div className="main-content">
    <section className="featured">
      {featuredPosts.map(post => 
        <Post key={post._id} {...post} />
      )}
    </section>

    <section className="middle">
      {otherPosts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </section>
  </div>

  <aside className="recent">
    <h2>Latest Posts</h2>
    <ul>
      {latestPosts.map(post => 
        <li key={post._id}>
          <Post {...post} />
        </li>
      )}
    </ul>
  </aside>
</div>
</>
  );
}