import { createStackNavigator } from "react-navigation"
// tslint:disable-next-line
import { createAppContainer } from "@react-navigation/native"
import { PromotionFullPageScreen, PromotionHalfPageScreen, PromotionPopupScreen } from "../../screens/promotion-screen"
import { EmailLoginScreen } from "../../screens/account-screen/email-login-screen"
import { AccountDetailScreen } from "../../screens/account-screen/account-detail-screen"
import { ProfileScreen } from "../../screens/account-screen/profile-screen"
import LoginOptionsScreen from "../../screens/account-screen/login-options-screen"

const AppNavigation = createStackNavigator(
  {
    // promotions
    PromotionFullPageScreen: { screen: PromotionFullPageScreen },
    PromotionHalfPageScreen: { screen: PromotionHalfPageScreen },
    PromotionPopupScreen: { screen: PromotionPopupScreen },

    // accounts
    ProfileScreen: { screen: ProfileScreen },
    AccountDetailScreen: { screen: AccountDetailScreen },
    EmailLoginScreen: { screen: EmailLoginScreen },
    LoginOptionsScreen: { screen: LoginOptionsScreen },
  },
  {
    initialRouteName: "LoginOptionsScreen",
    headerMode: "none",
  },
)

export default createAppContainer(AppNavigation)
