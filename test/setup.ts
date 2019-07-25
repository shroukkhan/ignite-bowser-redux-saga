// we always make sure 'react-native' gets included first
import "react-native" //import "@react-native-community/geolocation"
import "./mock-nativemodules"
// libraries to mock
import "./mock-async-storage"
import "./mock-i18n"
import "./mock-react-native-localize"
import "./mock-permissions"

import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

configure({ adapter: new Adapter() })

export const loc = {
  coords: {
    latitude: 1.1,
    longitude: 1.2,
  },
}

// @ts-ignore
global.__TEST__ = true
// @ts-ignore
global.alert = jest.fn()
// @ts-ignore

// jest.mock("geolocation",()=>{
//   const loc = {
//     coords: {
//       latitude: 1.1,
//       longitude: 1.2,
//     }
//   }
//   return
// })

// global.navigator = {
//   geolocation: {
//     resetCounter: () => {
//       // @ts-ignore
//       this.count = 1
//     },
//     getCurrentPosition: (success, failure) => {
//       // @ts-ignore
//       if (!this.count) {
//         // @ts-ignore
//         this.count = 1
//       }
//       // @ts-ignore
//       this.count++
//
//       // @ts-ignore
//       if (this.count % 2 === 0) {
//         console.log("[MOCK][getCurrentPosition] Failing the call")
//       } else {
//         console.log("[MOCK][getCurrentPosition] Successing the call")
//       }
//
//       // @ts-ignore
//       return this.count % 2 === 0 ? Promise.reject(failure()) : Promise.resolve(success(loc))
//     },
//     watchPosition: () => {
//       // @ts-ignore
//       this.count++
//       // @ts-ignore
//       return Promise((resolve, reject) => {
//         // @ts-ignore
//
//         resolve(loc)
//       })
//     },
//   },
// }
