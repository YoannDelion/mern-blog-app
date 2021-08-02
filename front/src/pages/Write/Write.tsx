import axios from 'axios'
import { useContext } from 'react'
import { FormEvent, useState } from 'react'
import { Context } from '../../context/Context'
import PostType from '../../types/post'
import "./write.css"

export default function Write() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState<any>(null)
  const { state: { user } } = useContext(Context)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // bidouille pour ts
    if (user) {
      const newPost: PostType = {
        title,
        content,
        username: user.username
      }
      if (file) {
        const data = new FormData()
        const filename = new Date().getTime() + file?.name
        data.append('name', filename)
        data.append('file', file)
        newPost.picture = filename
        try {
          await axios.post('/upload', data)
        } catch (error) {
          console.error(error)
        }
      }
      try {
        const res = await axios.post('/posts', newPost)
        window.location.replace(`/post/${res.data._id}`)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            autoFocus={true}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  )
}