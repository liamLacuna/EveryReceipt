import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoggedOutNavigator from "./LoggedOut";
import LoggedInNavigator from "./LoggedIn";

/**
 * @param loggedIn parameter sent from the root js file in src.
 * @default false , in case we never sent a parameter
 */
const getRootNavigator = createSwitchNavigator(
  {
    /**
     * Have the root navigator know about the two other navigators 
     * in this directory, see import statements above 
     */
    LoggedOut: {
      screen: LoggedOutNavigator
    },
    LoggedIn: {
      screen: LoggedInNavigator
    }
  },
  {
    initialRouteName: "LoggedOut"
  }
);

export default createAppContainer(getRootNavigator);

