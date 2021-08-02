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


export default function App() {


  const { state: { user } } = useContext(Context)

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