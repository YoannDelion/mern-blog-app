import axios from 'axios'
import { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import PostType from '../../types/post'
import "./singlePost.css"

export default function SinglePost() {

  const [post, setPost] = useState<PostType>()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [updateMode, setUpdateMode] = useState(false)
  const { state: { user } } = useContext(Context)

  const imgFolder = 'http://localhost:5000/images/'

  const location = useLocation()
  const postId: string = location.pathname.split('/')[2]

  useEffect(() => {
    const getPosts = async () => {
      const res = await axios.get(`/posts/${postId}`)
      setPost(res.data)
      setContent(res.data.content)
      setTitle(res.data.title)
    }
    getPosts()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`, { data: { username: user?.username } })
      window.location.replace('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${postId}`, {
        username: user?.username,
        title,
        content
      })
      setUpdateMode(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post?.picture && (
          <img
            className="singlePostImg"
            src={imgFolder + post.picture}
            alt={title}
          />
        )}
        {updateMode ? (
          <input
            className="singlePostTitleInput"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post?.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className='link' to={`/?user=${post?.username}`}>
                {post?.username}
              </Link>
            </b>
          </span>
          <span>{post && new Date(post.createdAt!).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
            {content}
          </p>
        )}
        {updateMode && <button className="singlePostButton" onClick={handleUpdate}>Update</button>}
      </div>
    </div>
  )
}