import { useEffect } from 'react'
import { createContext, Dispatch, FC, useReducer } from 'react'
import { Actions } from '../types/actionTypes'
import UserType from '../types/user'
import reducer from './Reducer'


export type InitialStateType = {
  user: UserType | null,
  isFetching: boolean,
  error: boolean
}

const initialState: InitialStateType = {
  user: JSON.parse(localStorage.getItem('user')!),
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