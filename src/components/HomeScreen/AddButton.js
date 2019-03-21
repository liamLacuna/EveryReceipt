/* eslint-disable linebreak-style */
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import {StyleSheet} from "react-native";
import React from "react";

export default class Add extends React.Component {

  render() {
    return(
      <React.Fragment>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Open Camera" onPress={() => {}}>
            <Icon name="md-camera" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Open Camera Roll" onPress={() => {}}>
            <Icon name="ios-image" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Manual Add" onPress={() => {}}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});




