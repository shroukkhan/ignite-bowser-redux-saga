import { createStackNavigator } from "react-navigation"
// tslint:disable-next-line
import { createAppContainer } from "@react-navigation/native"
import * as accountScreens from "../../screens/account-screen"
import * as promotionScreens from "../../screens/promotion-screen"

const AppNavigation = createStackNavigator(
  {
    // promotions
    PromotionFullPageScreen: { screen: promotionScreens.PromotionFullPageScreen },
    PromotionHalfPageScreen: { screen: promotionScreens.PromotionHalfPageScreen },
    PromotionPopupScreen: { screen: promotionScreens.PromotionPopupScreen },

    // accounts
    ProfileScreen: { screen: accountScreens.ProfileScreen },
    AccountDetailScreen: { screen: accountScreens.AccountDetailScreen },
    EmailLoginScreen: { screen: accountScreens.EmailLoginScreen },
    LoginOptionsScreen: { screen: accountScreens.LoginOptionsScreen },
  },
  {
    initialRouteName: "LoginOptionsScreen",
    headerMode: "none",
  },
)

export default createAppContainer(AppNavigation)
