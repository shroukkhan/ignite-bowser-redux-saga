// @flow

// a library to wrap and simplify api calls

import apisauce from "apisauce"
import AppConfig from "../../config/app-config"
import IRequestAccountLoginApi from "./request-account-login-api"


const POST = "post"
const GET = "get"
const PUT = "put"
const PATCH = "patch"
const DELETE = "delete"

const create = (baseURL: string = AppConfig.backendUrl) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
    },

    timeout: 30000,
  })

  const requestAccountLogin = (token: string, data: IRequestAccountLoginApi) => execute("oauth/token?access_token=" + token, POST, data)

  const execute = (url: string,
                   command: typeof GET | typeof POST | typeof PUT | typeof DELETE | typeof PATCH,
                   data?: JSON) => {
    console.log("[OKKAMI_API][" + command.toUpperCase() + "] > ", baseURL + url, " with data : ", data)

    // @ts-ignore
    return api[command](url, data)
  }

  return {
    requestAccountLogin,
    axios: api.axiosInstance, // expose the axios instance so that we can mock and test it
  }
}

export default create()
