import { createStackNavigator } from "react-navigation";

import HomeScreen from "../components/HomeScreen/HomeScreen";
import Profile from "../components/Profile/Profile";

/**
 * Create navigator for the home screen, which contains navigations to
 * the app's home screen or user profile.
 */
const HomeNavigator = createStackNavigator({
  /* this.props.navigation.navigate("HomeScreen") */
  HomeScreen: {
    screen: HomeScreen
  },
  /* this.props.navigation.navigate("Profile") */
  Profile: {
    screen: Profile
  }
});

export default HomeNavigator;
