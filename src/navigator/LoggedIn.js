import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProfileNavigator from "./ProfileNavigator";
import SearchNavigator from "./SearchNavigator";
import HomeNavigator from "./Home";

/**
 * @param loggedIn parameter sent from the root js file in src.
 * @default false , in case we never sent a parameter
 */
const LoggedInNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    Search: {
      screen: SearchNavigator
    },
    Profile: {
      screen: ProfileNavigator
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = "ios-information-circle";

        } else if (routeName === "Search") {
          iconName = "ios-options";
        }
        else if (routeName === "Profile") {
          iconName = "ios-options";
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    },
  }
);

export default LoggedInNavigator;

