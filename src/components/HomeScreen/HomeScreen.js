import React from "react";
import { Text, Button } from "react-native"

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
        <Button
        title="Logout"
        onPress={this.onLogout.bind(this)} />
        <Button
        title="Profile"
        onPress={this.goToProfile.bind(this)} />
        <Text>Welcome to EveryReceipt</Text>
      </React.Fragment>
    );
  }
}
