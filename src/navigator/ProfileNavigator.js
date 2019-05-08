import { createSwitchNavigator } from "react-navigation";
import AllExpenses from "../components/Profile/AllExpenses";
import Profile from "../components/Profile/Profile";

/**
 * Create navigator for the home screen, which contains navigations to
 * the app's home screen or user profile.
 */
const ProfileNavigator = createSwitchNavigator(
  {
  /* this.props.navigation.navigate("AllExpenses") */
    AllExpenses: {
      screen: AllExpenses
    },
    /* this.props.navigation.navigate("Profile") */
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Profile"
  }
);

export default ProfileNavigator;
