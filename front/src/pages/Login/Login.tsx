import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { ActionType } from '../../types/actionTypes'
import "./login.css"

export default function Login() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { dispatch, state: { isFetching } } = useContext(Context)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: ActionType.LoginStart })
    try {
      const res = await axios.post('/auth/login', {
        username,
        password
      })
      dispatch({ type: ActionType.LoginSuccess, payload: res.data })
    } catch (error) {
      dispatch({ type: ActionType.LoginFailure })
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your username..." onChange={e => setUsername(e.target.value)} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={e => setPassword(e.target.value)} />
        <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className='link' to='/register'>Register</Link>
      </button>
    </div>
  )
}