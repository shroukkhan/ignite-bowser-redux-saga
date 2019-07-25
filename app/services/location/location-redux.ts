import { createActions, createReducer } from "reduxsauce"
import Immutable from "seamless-immutable"
import * as R from "ramda"

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,

  requestGpsPermission:null,
  gpsPermissionComplete:["gpsPermission"],

  requestGpsLocation: null,
  gpsLocationSuccess: ["gpsLocationPayload"],
  gpsLocationFailure: ["gpsLocationError"],
})

export const LocationTypes = Types
export default Creators

export const LocationSelector = (state, variable) => state.location[variable]

export const INITIAL_STATE = Immutable({})

export const startup = (state: typeof Immutable) => {
  const keys = R.keys(Immutable.asMutable(state))
  console.log("[LOCATION_REDUX][location] Redux keys", keys, state)
  const toMerge = {}
  for (const key of keys) {
    if (key.endsWith("Error")) {
      toMerge[key] = null
    }
    if (key.endsWith("Fetching")) {
      toMerge[key] = false
    }
  }
  console.log("[LOCATION_REDUX][location] Resetting errors and fetching-s : ", toMerge)

  return state.merge(toMerge)
}

export const requestGpsLocation = (state: Immutable) => {
  return state.merge(
    {
      gpsLocationFetching: true,
      gpsLocationError:null
    })
}
export const gpsLocationSuccess = (state: Immutable, action) => {
  return state.merge(
    {
      gpsLocationFetching: false,
      gpsLocationPayload: action.gpsLocationPayload,

    })
}
export const gpsLocationFailure = (state: Immutable, action) => {
  return state.merge(
    {
      gpsLocationFetching: false,
      gpsLocationError: action.gpsLocationError,

    })
}

export const requestGpsPermission = (state:Immutable) => {
  return state.merge(
    {
      gpsPermissionFetching:true
    });
};
export const gpsPermissionComplete = (state:Immutable, action) => {
  return state.merge(
    {
      gpsPermissionFetching:false,
      gpsPermission:action.gpsPermission,

    });
};



export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,

  [Types.REQUEST_GPS_PERMISSION]: requestGpsPermission,
  [Types.GPS_PERMISSION_COMPLETE]: gpsPermissionComplete,

  [Types.REQUEST_GPS_LOCATION]: requestGpsLocation,
  [Types.GPS_LOCATION_SUCCESS]: gpsLocationSuccess,
  [Types.GPS_LOCATION_FAILURE]: gpsLocationFailure,
})
