import TopBar from './components/TopBar/TopBar'
import Home from './pages/Home/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Single from './pages/Single/Single'
import Write from './pages/Write/Write'
import Settings from './pages/Settings/Settings'
import { useContext } from 'react'
import { Context } from './context/Context'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { ActionType } from './types/actionTypes'


export default function App() {

  const { state: { user }, dispatch } = useContext(Context)

  const axiosRefresh = axios.create()

  const refreshToken = async () => {
    try {
      const res = await axiosRefresh.post("/auth/refresh", { token: user!.refreshToken })
      dispatch({ type: ActionType.RefreshTokens, payload: res.data })
      return res.data
    } catch (err) {
      dispatch({ type: ActionType.Logout })
      window.location.replace('/')
    }
  }

  axios.interceptors.request.use(
    async (config) => {

      if (user) {
        let currentDate = new Date()
        const decodedToken: any = jwt_decode(user.accessToken!)
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const data = await refreshToken()
          config.headers["Authorization"] = "Bearer " + data.accessToken
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/posts">
          <Home />
        </Route>
        <Route path="/register">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{user ? <Write /> : <Login />}</Route>
        <Route path="/settings">
          {user ? <Settings /> : <Login />}
        </Route>
      </Switch>
    </Router>
  )
}