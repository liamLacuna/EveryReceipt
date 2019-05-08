import { createSwitchNavigator } from "react-navigation";
import AllExpenses from "../components/Profile/AllExpenses";
import SearchScreen from "../components/SearchScreen/SearchScreen";
import ItemEdit from "../components/ItemEdit/ItemEdit";
import HomeScreen from "../components/HomeScreen/HomeScreen";
import ManualAddScreen from "../components/ItemEntry/ManualAddScreen";
import Profile from "../components/Profile/Profile";

/**
 * Create navigator for the home screen, which contains navigations to
 * the app's home screen or user profile.
 */
const SearchNavigator = createSwitchNavigator({
  /* this.props.navigation.navigate("SearchScreen") */
  SearchScreen: {
    screen: SearchScreen
  },
  /* this.props.navigation.navigate("ItemEdit") */
  ItemEdit: {
    screen: ItemEdit
  },
});

export default SearchNavigator;
