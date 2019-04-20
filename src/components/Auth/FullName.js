import React from "react";
import { 
  View, 
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../Common/styles";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginEntries: [
        {name: "First Name", id: "firstName"}, 
        {name: "Last Name", id: "lastName"}
      ]
    };
  }

  render() {
    return(
      <React.Fragment>
        {this.state.loginEntries.map((x) => {
          return(
            <View key={x.id} style={styles.inputContainer}>
              <Icon 
                name="ios-contact" 
                size={28} 
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput 
                style={styles.input}
                id={x.id}
                onChangeText={(text) => this.props.handleChange(x.id, text)}
                textAlign="center"
                placeholder={x.name}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                underlineColorAndroid= "transparent"
              />
            </View>
          );
        })}
      </React.Fragment>
    );
  }
}

