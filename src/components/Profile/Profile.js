import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  async onLogout() {
    this.props.navigation.navigate("LoggedOut");
  }

  async goToHome() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return (
      <View style={styles.base}>
        <Button
          title="Logout"
          onPress={this.onLogout.bind(this)} />
        <Button title="Home" onPress={this.goToHome.bind(this)} />
        <Text>We out here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
