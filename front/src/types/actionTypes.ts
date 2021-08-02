import UserType from './user'

export enum ActionType {
  LoginStart,
  LoginSuccess,
  LoginFailure,
  Logout,
  UpdateStart,
  UpdateSuccess,
  UpdateFailure,
}

export type LoginStartType = {
  type: ActionType.LoginStart
}
export type LoginSuccessType = {
  type: ActionType.LoginSuccess,
  payload: UserType
}
export type LoginFailureType = {
  type: ActionType.LoginFailure
}
export type LogoutType = {
  type: ActionType.Logout
}

export type UpdateStartType = {
  type: ActionType.UpdateStart
}
export type UpdateSuccessType = {
  type: ActionType.UpdateSuccess,
  payload: UserType
}
export type UpdateFailureType = {
  type: ActionType.UpdateFailure
}

export type Actions = LoginStartType | LoginSuccessType | LoginFailureType | LogoutType | UpdateStartType | UpdateSuccessType | UpdateFailureType