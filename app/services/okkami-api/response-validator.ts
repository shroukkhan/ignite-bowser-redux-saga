/**
 * Validates an apisauce response object for okkami api
 * Returns response data obj if ok. otherwise throw error
 * @param responseObj
 * @returns {boolean|*}
 */
import { ApiResponse } from "apisauce"

export function validateOrThrowApiResponse (responseObj?: ApiResponse<JSON>): JSON {
  const isInvalid =
    !responseObj ||
    (responseObj.status && (responseObj.status < 200 || responseObj.status > 299)) ||
    !responseObj.ok ||
    (responseObj.data && (responseObj.data as any).error)
  if (isInvalid && responseObj) {
    let errorMessage = responseObj.problem
    if (responseObj.data && (responseObj.data as any).error) {
      errorMessage = (responseObj.data as any).error
    }
    throw Error(errorMessage)
  }
  return responseObj && responseObj.data
}
