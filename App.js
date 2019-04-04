import React from "react";
import AppNavigator from "./src/navigator/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/store";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

