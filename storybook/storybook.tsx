import React from "react"
// tslint:disable-next-line
import { configure, getStorybookUI } from "@storybook/react-native"
import SplashScreen from "react-native-splash-screen"

configure(() => {
  require("./storybook-registry")
})

const StorybookUI = getStorybookUI({ port: 9001, host: "localhost", onDeviceUI: true })

// RN hot module must be in a class for HMR
export class StorybookUIRoot extends React.Component {
  public componentDidMount() {
    SplashScreen.hide()
    if (typeof __TEST__ === "undefined" || !__TEST__) {
     // we do not need reactotron
    }
  }
  public render() {
    return <StorybookUI />
  }
}
