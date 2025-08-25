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
  const featuredPosts = posts.slice(5,7);
  const otherPosts = posts.slice(7);

  return (
    <div className="home-layout">

      <section className="featured">
        {posts.length > 0 
        && featuredPosts.map(post => 
        <Post key={post._id} {...post} />)}
      </section>
      
      <section className="recent">
        <h2>Latest Posts</h2>

        {posts.length > 0 
        && latestPosts.map(post => 
        <li key={post._id}>
          <Post  {...post} />
        </li>)}

      </section>

      <section className="middle">
        {otherPosts.map(post => (
          <Post key={post._id} {...post} />
        ))}
      </section>
      


    </div>
  );
}