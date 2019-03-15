import { createSwitchNavigator } from "react-navigation";

import LoginScreen from "../components/Auth/LoginScreen";
import SignUpScreen from "../components/Auth/SignUpScreen";

/**
 * Create navigator for the login screen. To navigate to this view we can
 * do: this.props.navigation.navigate("Login");
 */
const LoggedOutNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  SignUpScreen: {
    screen: SignUpScreen
  },
},
{
  initialRouteName: "LoginScreen"
}
);

export default LoggedOutNavigator;

