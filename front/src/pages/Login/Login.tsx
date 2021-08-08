import axios from 'axios'
import { useCallback, useState } from 'react'
import { useContext } from 'react'
import { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/atoms/Button/Button'
import TextInput from '../../components/atoms/TextInput/TextInput'
import { Context } from '../../context/Context'
import { ActionType } from '../../types/actionTypes'
import "./login.css"

export default function Login() {

  const [credentials, setCredentials] = useState<any>({ username: '', password: '' })
  const { dispatch, state: { isFetching } } = useContext(Context)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    dispatch({ type: ActionType.LoginStart })
    try {
      const res = await axios.post('/auth/login', credentials)
      dispatch({ type: ActionType.LoginSuccess, payload: res.data })
    } catch (error) {
      dispatch({ type: ActionType.LoginFailure })
    }
  }

  const handleChange = useCallback(({ target }) => {
    const { name, value } = target
    setCredentials({ ...credentials, [name]: value })
  },
    [credentials],
  )

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>

        <TextInput label='Username' name='username' onChange={handleChange} value={credentials.username} placeholder="Enter your username..." />
        <TextInput label='Password' type='password' name='password' onChange={handleChange} value={credentials.password} placeholder="Enter your password..." />

        <Button color='primary' type='submit' disabled={isFetching} classes='loginButton'>Login</Button>
      </form>
      <Button color={'secondary'} classes='loginRegisterButton'>
        <Link className='link' to='/register'>Register</Link>
      </Button>
    </div >
  )
}