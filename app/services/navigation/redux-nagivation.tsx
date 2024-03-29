import * as React from "react"
import { BackHandler, Platform } from "react-native"
import { createReactNavigationReduxMiddleware, createReduxContainer } from "react-navigation-redux-helpers"
import { connect } from "react-redux"
import AppNavigation from "./app-navigation"

export const reducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
}

createReactNavigationReduxMiddleware(
  (state: { nav: any }) => state.nav,
  "root",
)

const ReduxAppNavigator = createReduxContainer(AppNavigation, "root")

class ReduxNavigation extends React.Component <{
  // tslint:disable-next-line
  dispatch: ({ type: string }) => void,
  nav: any
}> {
  public componentDidMount() {
    if (Platform.OS === "ios") { return }
    BackHandler.addEventListener("hardwareBackPress", () => {
      const { dispatch, nav } = this.props
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes.length === 1 && (nav.routes[0].routeName === "LaunchScreen")) {
        return false
      }
      dispatch({ type: "Navigation/BACK" })
      return true
    })
  }

  public componentWillUnmount() {
    if (Platform.OS === "ios") { return }
    BackHandler.removeEventListener("hardwareBackPress", undefined)
  }

  public render() {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav}/>
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
})
export default connect(mapStateToProps)(ReduxNavigation)
