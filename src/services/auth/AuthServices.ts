import { api } from "../api"
import Cookies from "js-cookie"

import { SignInParams } from "../../interfaces"

export const signIn = (params: SignInParams)  => {
  const url = 'admin_auth/sign_in';

  return api.post(url, params)
}

export const signOut = () => {
  const url = 'admin_auth/sign_out';

  return api.delete(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }}) 
}

export const getUser = () => {
  const url = 'admin_auth/validate_token';

  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return api.get(url, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}
