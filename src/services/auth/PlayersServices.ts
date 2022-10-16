import { api } from "../api"
import Cookies from "js-cookie"

export const getPlayers = (body = {}) => {
  const url = 'admin/players'
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }, params: body})
}

export const getPlayer = (id: number) => {
  const url = `admin/players/${id}`
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}


export const postNewNotification = (id: number , message: string) => {
  const url = `/admin/players/${id}/notification`;
  const body= {
    message: message
  }
  return api.post(url, body, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}


export const putNotification = (id: number, message: string) => {
  const url = `/admin/${id}/notification`;
  
  return api.put(url, {message: message},{ headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}

export const deleteNotification = (id: number) => {
  const url = `/admin/${id}/notification`;
  
  return api.delete(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}