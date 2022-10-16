import { api } from "../api"
import Cookies from "js-cookie"

export const getUsers = (body = {}) => {
  const url = 'admin/users'
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }, params: body})
}

export const getUser = (id: number) => {
  const url = `admin/users/${id}`
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
