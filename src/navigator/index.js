import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoggedOutNavigator from "./LoggedOut";
import HomeNavigator from "./Home";

/**
 * @param loggedIn parameter sent from the root js file in src.
 * @default false , in case we never sent a parameter
 */
const getRootNavigator =  createSwitchNavigator(
  {
    /**
     * Have the root navigator know about the two other navigators 
     * in this directory, see import statements above 
     */
    LoggedOut: {
      screen: LoggedOutNavigator
    },
    Home: {
      screen: HomeNavigator
    }
  },
  {
    initialRouteName: "LoggedOut"
  }
);

export default createAppContainer(getRootNavigator);
