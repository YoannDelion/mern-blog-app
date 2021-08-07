import axios from 'axios'
import { Actions, ActionType } from '../types/actionTypes'
import { InitialStateType } from './Context'

const reducer = (state: InitialStateType, action: Actions) => {
  switch (action.type) {
    case ActionType.LoginStart:
      return {
        user: null,
        isFetching: true,
        error: false
      }
    case ActionType.LoginSuccess:
      const token = `Bearer ${action.payload.accessToken}`
      axios.defaults.headers['Authorization'] = token

      return {
        user: action.payload,
        isFetching: false,
        error: false
      }
    case ActionType.LoginFailure:
      return {
        user: null,
        isFetching: false,
        error: true
      }
    case ActionType.Logout:
      delete axios.defaults.headers['Authorization']

      return {
        user: null,
        isFetching: false,
        error: false
      }
    case ActionType.UpdateStart:
      return {
        ...state,
        isFetching: true
      }
    case ActionType.UpdateSuccess:
      return {
        user: action.payload,
        isFetching: false,
        error: false
      }
    case ActionType.UpdateFailure:
      return {
        user: state.user,
        isFetching: false,
        error: true
      }
    default:
      return state
  }
}

export default reducer