export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
}

export interface Player {
  id: number
  name: string
  number: number
  nationality: string
  birth_date: string
  age: number
  position: string
  team: string
  notifications: Array<Notification>
  notifications_count: number
}

export interface UserApi {
  id: number,
  name: string,
  email: string,
  subscriptions_count: number,
  subscriptions: Array<Player>
}

export interface Notification {
  id: number
  message: string
  created_at: string
}