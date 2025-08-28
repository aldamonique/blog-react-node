import { format } from "date-fns";
import { Link } from "react-router-dom";
import './PostCard.css';
export default function Post({ _id, title, summary, cover, createdAt, author }) {

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} alt={title} />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">By {author?.name}</span>
          
          <time>{format(new Date(createdAt), 'd MMM, yyyy')}</time>
        </p>
        <div className="summary-div">
        <p className="summary">{summary}</p>
        <Link to={`/post/${_id}`}>
        <p className="read-more">Read more</p>
        </Link>    
        </div>

    </div>
    </div>
  );
}