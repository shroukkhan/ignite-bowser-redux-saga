import { createStackNavigator } from "react-navigation"
import { AppNavigation } from "./app-navigation"

export const RootNavigator = createStackNavigator(
  {
    primaryStack: { screen: AppNavigation },
  },
  {
    headerMode: "none",
    navigationOptions: { gesturesEnabled: false },
  },
)
