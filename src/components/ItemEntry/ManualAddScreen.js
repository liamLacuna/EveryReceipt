import React, { Component } from "react";
import { View } from "react-native";
import FormFields from "./FormFields";
import { styles } from "../Auth/styles";

export default class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      items: [],
      total: 0
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <FormFields />
      </View>
    );
  }
}








