import React, { Component } from "react";
import { AppRegistry, TextInput, StyleSheet } from "react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../Auth/styles";

export default class FormFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [
        { name: "Date", id: "date", onChangeText: this.handleChange },
        { name: "Store Name", id: "store", onChangeText: this.handleChange },
        { name: "Total Amount", id: "total", onChangeText: this.handleChange },
      ]
    };
    handleChange = () => {

    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.fields.map((f) => {
          return (
            <View key={f.id} style={styles.inputContainer}>
              <TextInput style={styles.input}
                textAlign="center"
                underlineColorAndroid="transparent"
                placeholder={f.name}
                onChangeText={f.onChangeText}
              />
            </View>
          );
        }
        )}
      </React.Fragment>
    );
  }
}








