import { createStackNavigator } from "react-navigation"
import { createAppContainer } from "@react-navigation/native"
import { PromotionFullPageScreen, PromotionHalfPageScreen, PromotionPopupScreen } from "../../screens/promotion-screen"

const AppNavigation = createStackNavigator(
  {
    PromotionFullPageScreen: { screen: PromotionFullPageScreen },
    PromotionHalfPageScreen: { screen: PromotionHalfPageScreen },
    PromotionPopupScreen: { screen: PromotionPopupScreen },
  },
  {
    headerMode: "none",
  },
)

export default createAppContainer(AppNavigation)
