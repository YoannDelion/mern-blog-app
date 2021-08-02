import { Link } from 'react-router-dom'
import PostType from '../../types/post'
import './post.css'

export default function Post({ post }: PropsTypes) {

  const imgFolder = 'http://localhost:5000/images/'

  return (
    <div className="post">
      {post.picture && (
        <img
          className="postImg"
          src={imgFolder + post.picture}
          alt={post.title}
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories?.map(cat => (
            <span className="postCat">
              {cat.name}
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link className='link' to={`/post/${post._id}`}>
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt!).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.content}
      </p>
    </div>
  )
}

type PropsTypes = {
  post: PostType
}