
import React from "react";
import { Text, Button, StyleSheet } from "react-native";
import  AddButton  from "./AddButton.js";


export default class Title extends React.Component {


  async onLogout() {
    this.props.navigation.navigate("LoggedOut");
  }

  async goToProfile() {
    this.props.navigation.navigate("Profile");
  }

  render() {
    return(
      <React.Fragment>
        <AddButton/>
        <Button
          title="Logout"
          onPress={this.onLogout.bind(this)} />
      </React.Fragment>
    );
  }
}

