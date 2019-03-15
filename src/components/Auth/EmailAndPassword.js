import React from "react";
import { 
  View, 
  TextInput,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginEntries: [
        {name: "Email", id: "email", iconName: "ios-mail", secure: false}, 
        {name: "Password", id: "password", iconName: "ios-key", secure: true}
      ],
      hidePass: true
    };
  }

  toggleShow() {
    this.setState({
      hidePass: !this.state.hidePass
    })
  }

  render() {
    return(
      <React.Fragment>
        {this.state.loginEntries.map((x) => {
          return(
            <View key={x.id} style={styles.inputContainer}>
              <Icon 
                name={x.iconName} 
                size={28} 
                color={"rgba(255,255,255,0.7)"} 
                style={styles.inputIcon}
              />
              <TextInput 
                style={styles.input}
                id={x.id}
                onChange={this.props.handleChange.bind(this)}
                textAlign="center"
                placeholder={x.name}
                secureTextEntry={x.id === "password" ? 
                  this.state.hidePass : false}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                underlineColorAndroid= "transparent"
              />
              {x.id === "password" ? 
                <TouchableOpacity style={styles.btnEye} onPress={this.toggleShow.bind(this)}>
                  <Icon name={"ios-eye"} size={26} 
                    color={"rgba(255, 255, 255, 0.7)"} />
                </TouchableOpacity> 
              : 
                <React.Fragment />}
            </View>
          );
        })}
      </React.Fragment>
    );
  }
}

