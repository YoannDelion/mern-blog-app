import axios from 'axios'
import { FormEvent, useContext, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Context } from '../../context/Context'
import { ActionType } from '../../types/actionTypes'
import UserType from '../../types/user'
import "./settings.css"

export default function Settings() {

  const [file, setFile] = useState<any>(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const { dispatch, state: { user } } = useContext(Context)
  const imgFolder = 'http://localhost:5000/images/'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: ActionType.UpdateStart })
    setSuccess(false)
    // bidouille pour ts
    if (user) {
      const updatedUser: UserType = {
        userId: user._id,
        username,
        email,
        password
      }
      if (file) {
        const data = new FormData()
        const filename = new Date().getTime() + file?.name
        data.append('name', filename)
        data.append('file', file)
        updatedUser.profilePic = filename
        try {
          await axios.post('/upload', data)
        } catch (error) {
          console.error(error)
        }
      }
      try {
        const res = await axios.put(`/users/${user._id}`, updatedUser)
        setSuccess(true)
        dispatch({ type: ActionType.UpdateSuccess, payload: res.data })
      } catch (error) {
        dispatch({ type: ActionType.UpdateFailure })
        console.error(error)
      }
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : imgFolder + user?.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0])
                }
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user?.username}
            name="name"
            onChange={e => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={e => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && <span style={{
            color: 'green',
            textAlign: 'center',
            marginTop: '20px'
          }}>Profile updated!</span>}
        </form>
      </div>
      <SideBar />
    </div >
  )
}