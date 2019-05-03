/* eslint-disable linebreak-style */
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import React from "react";
export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {
          title: "Open Camera", color: "#9b59b6",
          icon: "md-camera",
          id: "camera"
        },
        {
          title: "Open Camera Roll", color: "#3498db",
          icon: "ios-image",
          id: "roll"
        },
        {
          title: "Manual Add", color: "#1abc9c",
          icon: "md-create",
          id: "manual"
        },
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          {this.state.buttons.map((btn) => {
            return (
              <ActionButton.Item key={btn.id} buttonColor={btn.color} title={btn.title} onPress={() => { this.props.handlePress(btn.id); }}>
                <Icon name={btn.icon} style={styles.actionButtonIcon} />
              </ActionButton.Item>
            );
          })}
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
  }
});