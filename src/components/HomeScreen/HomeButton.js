import React from "react";
import { 
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../Common/styles";

export default class HomeButton extends React.Component {
  render(){
    let { onPress } = this.props;
    return(
      <TouchableOpacity onPress={onPress} 
        style={styles.btnLogin} >
        <Text style={styles.text} >{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

