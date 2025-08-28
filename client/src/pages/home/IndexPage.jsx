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
  const featuredPosts = posts.slice(5, 7);
  const otherPosts = posts.slice(1,8);
  const cardGridPosts = posts.slice(6).reverse(); 

  return (
    <><div className="lines">
    </div>
  <div className="home-layout">

  <div className="main-content">
    <section className="featured-content">
      <div className="hero-text-below">
        <h2 className="tittle">This Week’s Highlights</h2>
        <p>The Blog Art is your space to explore and share creativity, from music and cinema to digital and classic art.</p>
      </div>
      <div className="featured">
      {featuredPosts.map(post => 
        <Post key={post._id} {...post} />
      )}</div>
    </section>

    <section className="middle">
      {otherPosts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </section >

    <section className="grid-card">
      {cardGridPosts.map(post => (
      <Post key={post._id} {...post}/> 
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