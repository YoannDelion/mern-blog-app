import PostType from '../../types/post'
import Post from '../Post/Post'
import './posts.css'

export default function Posts({ posts }: PropsTypes) {
  return (
    <div className="posts">
      {posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}

type PropsTypes = {
  posts: PostType[]
}