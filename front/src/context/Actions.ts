import { ActionType, LoginFailureType, LoginStartType, LoginSuccessType, LogoutType, UpdateFailureType, UpdateStartType, UpdateSuccessType } from '../types/actionTypes'
import UserType from '../types/user'

export const LoginStart = (userCredentials: any): LoginStartType => ({
  type: ActionType.LoginStart
})

export const LoginSuccess = (user: UserType): LoginSuccessType => ({
  type: ActionType.LoginSuccess,
  payload: user
})

export const LoginFailure = (): LoginFailureType => ({
  type: ActionType.LoginFailure
})

export const Logout = (): LogoutType => ({
  type: ActionType.Logout
})

export const UpdateStart = (userCredentials: any): UpdateStartType => ({
  type: ActionType.UpdateStart
})

export const UpdateSuccess = (user: UserType): UpdateSuccessType => ({
  type: ActionType.UpdateSuccess,
  payload: user
})

export const UpdateFailure = (): UpdateFailureType => ({
  type: ActionType.UpdateFailure
})
