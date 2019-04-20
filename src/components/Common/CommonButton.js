import React from "react";
import { 
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../Common/styles.js";

export default class AuthButton extends React.Component {

  render(){
    let { onPress, text } = this.props;
    let txtStyle = txtStyle in this.props ? this.props.txtStyle : styles.text;
    let btnStyle = btnStyle in this.props ? this.props.btnStyle : styles.btnLogin;

    return(
      <TouchableOpacity onPress={onPress} 
        style={btnStyle} >
        <Text style={txtStyle} >{text}</Text>
      </TouchableOpacity>
    );
  }
}

