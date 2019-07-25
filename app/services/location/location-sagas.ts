import { all, call, put, race, select, take, takeLatest } from "redux-saga/effects"
import Actions, { LocationSelector, LocationTypes } from "./location-redux"
import { Alert } from "react-native"
import Permissions from "react-native-permissions"
import { getStore } from "../root-store"
import AppConfig from "../../config/app-config"
import Geolocation from "@react-native-community/geolocation"

const typeOfGpsPermission = "whenInUse"

export function* requestGpsPermission() {
  const tag = "[REQUEST_GPS_PERMISSION] "
  try {

    let permissionStatus = yield Permissions.check("location", { type: typeOfGpsPermission })
    console.log(tag + "Permission status is : ", permissionStatus)

    if (permissionStatus === "undetermined") {
      // we need to ask for it
      permissionStatus = yield Permissions.request("location", { type: typeOfGpsPermission })
    }

    if (permissionStatus === "authorized") {
      // nothing to do , we are good
      console.log(tag + "We are authorized")
    }

    if (permissionStatus === "denied" || permissionStatus === "restricted") {
      // we are in trouble
      let gpsAlertStatus = ""
      console.log(tag + "Trying to persuade user! Because current permissionStatus = ", permissionStatus)
      Alert.alert(
        "We respect your privacy, we only use your location to find nearby hotels",
        "Allowing access to your location will make your experience easier",
        [
          {
            text: "Don't Allow",
            style: "cancel",
            onPress: () => {
              permissionStatus = "denied"
              console.warn(tag + "Location permission denied , setting gpsAlertStatus = " + permissionStatus)
              gpsAlertStatus = permissionStatus
              getStore().dispatch({
                type: "GPS_ALERT_COMPLETE",
              })
            },
          },
          {
            text: "Allow",
            onPress: () => {
              gpsAlertStatus = "openPermission"
              getStore().dispatch({
                type: "GPS_ALERT_COMPLETE",
              })
            },
          },
        ],
        { cancelable: false },
      )

      console.log(tag + "Going to wait for popup to dispose : ", gpsAlertStatus)
      yield take("GPS_ALERT_COMPLETE")
      console.log(tag + "Alert disposed , status : ", gpsAlertStatus)

      if (gpsAlertStatus === "openPermission") {
        console.log(tag + "Opening permission settings to see if we get it")
        yield Permissions.openSettings()
        // the following line is blocked until the user comes back to our app
        console.log(tag + "Permission settings closed")
        permissionStatus = yield Permissions.check("location", { type: typeOfGpsPermission })
        console.log(tag + "New Permission status is : ", permissionStatus)
      }
    }

    yield put(Actions.gpsPermissionComplete(permissionStatus))
  } catch (e) {
    console.warn(tag + "requestGpsPermission failed with error : ", e)
    const message = e.message ? e.message : "Failed"
    yield put(Actions.gpsPermissionComplete(message))
  }
}

/**
 * Query navigator to get gps
 * @param options
 * @returns {Promise<Position>}
 */
const doGpsQuery = (options: PositionOptions) => new Promise((resolve, reject) => {
  const tag = "[DO_GPS_QUERY] "
  console.warn(tag + "GPS Query was requested! This might slow down app. careful when using it . using options: ", {
    options,
  })
  Geolocation.getCurrentPosition(location => resolve(location), error => reject(error), options)

})

/**
 * Always use this function to retrieve gps location.
 */
export function* getGpsLocation() {
  const tag = "[getGpsLocation] "
  yield put(Actions.requestGpsLocation())
  // @ts-ignore
  const { locationSuccess, locationFailure } = yield race({
    locationSuccess: take("GPS_LOCATION_SUCCESS"),
    locationFailure: take("GPS_LOCATION_FAILURE"),
  })
  console.log(tag + " gps location result is  : ", { locationSuccess, locationFailure })
  if (locationSuccess) {
    const location: Position = yield select(LocationSelector, "gpsLocationPayload")
    if (location) {
      return { latitude: location.coords.latitude, longitude: location.coords.longitude }
    }
  }
  return null
}


export function* requestGpsLocation() {
  const tag = "[REQUEST_GPS_LOCATION]"
  try {
    console.log(tag + "Checking for gps permission first")
    yield put(Actions.requestGpsPermission())
    yield take(LocationTypes.GPS_PERMISSION_COMPLETE) // block call until gps permission returns

    const permissionStatus = yield select(LocationSelector, "gpsPermission")
    console.log(tag + "Gps Permission loop complete with status : " + permissionStatus)

    if (permissionStatus !== "authorized") {
      throw Error("Gps permission status is : " + permissionStatus)
    }
    let gpsLocation: Position
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: AppConfig.locationRequestTimeout,
        maximumAge: AppConfig.maximumGpsAge,
      }
      gpsLocation = yield call(doGpsQuery, options)
    } catch (gpsError) {
      console.warn(tag + "Gps attempt 1 had failed, trying again with : enableHighAccuracy", false)
      const options = {
        enableHighAccuracy: false,
        timeout: AppConfig.locationRequestTimeout,
        maximumAge: AppConfig.maximumGpsAge,
      }
      gpsLocation = yield call(doGpsQuery, options)
    }
    console.log(tag + "gpsLocation is : ", gpsLocation)
    if (gpsLocation) {
      console.log(tag + "Succeeding the gps call [gpsSuccess] with : ", gpsLocation)
      yield put(Actions.gpsLocationSuccess(gpsLocation))
    } else {
      throw Error("Failed to obtain gpsLocation from navigator")
    }
  } catch (e) {
    console.warn("[GPS_REQUEST] gpsRequest failed with error : ", e)
    const message = e && e.message ? e.message : "Failed"
    yield put(Actions.gpsLocationFailure(message))
  }
}


export default function* rootSaga() {
  yield all([
    takeLatest(LocationTypes.REQUEST_GPS_LOCATION, requestGpsLocation),
    takeLatest(LocationTypes.REQUEST_GPS_PERMISSION, requestGpsPermission),
  ])
}
