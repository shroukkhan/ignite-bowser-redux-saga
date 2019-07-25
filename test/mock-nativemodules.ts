import { loc } from "./setup"

jest.mock("NativeModules", () => ({
  UIManager: {
    RCTView: () => {
    },
  },
  KeyboardObserver:jest.fn(),
  PlatformConstants: jest.fn(),
  RNCGeolocation:{
    resetCounter: () => {
      // @ts-ignore
      this.count = 1
    },
    getCurrentPosition: (success, failure) => {
      // @ts-ignore
      if (!this.count) {
        // @ts-ignore
        this.count = 1
      }
      // @ts-ignore
      this.count++

      // @ts-ignore
      if (this.count % 2 === 0) {
        console.log("[MOCK][getCurrentPosition] Failing the call")
      } else {
        console.log("[MOCK][getCurrentPosition] Successing the call")
      }

      // @ts-ignore
      return this.count % 2 === 0 ? Promise.reject(failure()) : Promise.resolve(success({
        coords: {
          latitude: 1.1,
          longitude: 1.2,
        },
      }))
    },
    watchPosition: () => {
      // @ts-ignore
      this.count++
      // @ts-ignore
      return Promise((resolve, reject) => {
        // @ts-ignore

        resolve({
          coords: {
            latitude: 1.1,
            longitude: 1.2,
          },
        })
      })
    },
  },
  RNGestureHandlerModule: {
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),
    State: {},
    Directions: {},

  },
}))
