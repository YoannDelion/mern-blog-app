import { useEffect } from 'react'
import { createContext, Dispatch, FC, useReducer } from 'react'
import { Actions } from '../types/actionTypes'
import UserType from '../types/user'
import reducer from './Reducer'
import jwt_decode from 'jwt-decode'


export type InitialStateType = {
  user: UserType | null,
  isFetching: boolean,
  error: boolean
}

const localUser = localStorage.getItem('user')!
let user = null

if (localUser !== 'null') {
  user = JSON.parse(localUser)
  let currentDate = new Date()
  const decodedToken: any = jwt_decode(user.accessToken)

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log('Expired in context')
    user = null
  }
}

const initialState: InitialStateType = {
  user,
  isFetching: false,
  error: false
}

export const Context = createContext<{ state: InitialStateType, dispatch: Dispatch<Actions> }>({ state: initialState, dispatch: () => undefined })

export const ContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  )
}