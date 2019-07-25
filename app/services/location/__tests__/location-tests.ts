import SagaTester from "redux-saga-tester"
import { INITIAL_STATE, LocationTypes } from "../location-redux"
import { Alert } from "react-native"

import MockPermission from "react-native-permissions"
import { reducers, setMockStore } from "../../root-store"
import Immutable from "seamless-immutable"
import rootSaga from "../../root-store/root-saga"
import { loc } from "../../../../test/setup"

let sagaTester: typeof SagaTester


describe("Test gpsLocation ", () => {
  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState: {
        location: INITIAL_STATE,
        startup: Immutable({
          startupComplete: true,
        }),
      },
      reducers
    })
    sagaTester.start(rootSaga)

    setMockStore(sagaTester)

  })


  test("[Success] undetermined -> authorized", async () => {

    const reqSpy = jest.spyOn(MockPermission, "request")
    MockPermission.setAuthStatus({
      check: ["undetermined"],
      request: ["authorized"],
    })

    sagaTester.dispatch({
      type: LocationTypes.REQUEST_GPS_LOCATION,
    })

    expect(sagaTester.getState().location.gpsLocationFetching).toBe(true)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)
    console.log("Going to wait for gpsLocation success")
    await sagaTester.waitFor(LocationTypes.GPS_LOCATION_SUCCESS)
    console.log("gpsLocation success was fired")
    expect(reqSpy).toHaveBeenCalled()
    console.log("Current gpsLocation Location is:  ", sagaTester.getState().location.gpsLocationPayload)
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(false)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)
    expect(sagaTester.getState().location.gpsLocationPayload).toEqual(loc)
    console.log("DONE!")
    reqSpy.mockRestore()
  }, 25000)

  test("[Success] authorized", async () => {
    const reqSpy = jest.spyOn(MockPermission, "request")

    MockPermission.setAuthStatus({
      check: ["authorized"],
      request: [],
    })

    sagaTester.dispatch({
      type: LocationTypes.REQUEST_GPS_LOCATION,
    })
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(true)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)
    await sagaTester.waitFor(LocationTypes.GPS_LOCATION_SUCCESS)
    expect(reqSpy).not.toHaveBeenCalled()

    console.log("Current gpsLocation Location is:  ", sagaTester.getState().location.gpsLocationPayload)
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(false)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)
    expect(sagaTester.getState().location.gpsLocationPayload).toEqual(loc)

    reqSpy.mockRestore()
  }, 25000)

  test("[Success] denied -> authorized", async () => {
    jest.mock("Alert", () => {
      return {
        alert: jest.fn(),
      }
    })
    const reqSpy = jest.spyOn(MockPermission, "request")
    const opnStng = jest.spyOn(MockPermission, "openSettings")

    MockPermission.setAuthStatus({
      check: ["denied", "authorized"],
      request: [],
    })

    sagaTester.dispatch({
      type: LocationTypes.REQUEST_GPS_LOCATION,
    })
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(true)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)

    // @ts-ignore
    Alert.alert.mock.calls[0][2][1].onPress()
    await sagaTester.waitFor("GPS_ALERT_COMPLETE")

    expect(opnStng).toHaveBeenCalled()
    expect(reqSpy).not.toHaveBeenCalled()

    await sagaTester.waitFor(LocationTypes.GPS_LOCATION_SUCCESS)

    console.log("Current gpsLocation Location is:  ", sagaTester.getState().location.gpsLocationPayload)
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(false)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)
    expect(sagaTester.getState().location.gpsLocationPayload).toEqual(loc)

    reqSpy.mockRestore()
    opnStng.mockRestore()
  }, 25000)

  test("[Failure] denied -> denied [ Open settings, but deny again ]", async () => {
    jest.mock("Alert", () => {
      return {
        alert: jest.fn(),
      }
    })
    const reqSpy = jest.spyOn(MockPermission, "request")
    const opnStng = jest.spyOn(MockPermission, "openSettings")

    MockPermission.setAuthStatus({
      check: ["denied"],
      request: [],
    })

    sagaTester.dispatch({
      type: LocationTypes.REQUEST_GPS_LOCATION,
    })
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(true)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)

    // @ts-ignore
    Alert.alert.mock.calls[0][2][0].onPress()
    await sagaTester.waitFor("GPS_ALERT_COMPLETE")

    expect(opnStng).not.toHaveBeenCalled()
    expect(reqSpy).not.toHaveBeenCalled()

    await sagaTester.waitFor(LocationTypes.GPS_LOCATION_FAILURE)

    expect(sagaTester.getState().location.gpsLocationFetching).toBe(false)
    expect(sagaTester.getState().location.gpsLocationError).toBe("Gps permission status is : denied")
    expect(sagaTester.getState().location.gpsLocationPayload).toBeFalsy()

    reqSpy.mockRestore()
    opnStng.mockRestore()
  }, 25000)

  test("[Failure] denied -> denied [ not even allowed to open setting ] ", async () => {
    jest.mock("Alert", () => {
      return {
        alert: jest.fn(),
      }
    })
    const reqSpy = jest.spyOn(MockPermission, "request")
    const opnStng = jest.spyOn(MockPermission, "openSettings")

    MockPermission.setAuthStatus({
      check: ["denied"],
      request: [],
    })

    sagaTester.dispatch({
      type: LocationTypes.REQUEST_GPS_LOCATION,
    })
    expect(sagaTester.getState().location.gpsLocationFetching).toBe(true)
    expect(sagaTester.getState().location.gpsLocationError).toBe(null)

    // @ts-ignore
    Alert.alert.mock.calls[0][2][0].onPress()
    await sagaTester.waitFor("GPS_ALERT_COMPLETE")

    expect(opnStng).not.toHaveBeenCalled()
    expect(reqSpy).not.toHaveBeenCalled()

    await sagaTester.waitFor(LocationTypes.GPS_LOCATION_FAILURE)


    expect(sagaTester.getState().location.gpsLocationFetching).toBe(false)
    expect(sagaTester.getState().location.gpsLocationError).toBe("Gps permission status is : denied")
    expect(sagaTester.getState().location.gpsLocationPayload).toBeFalsy()

    reqSpy.mockRestore()
    opnStng.mockRestore()
  }, 25000)


})
