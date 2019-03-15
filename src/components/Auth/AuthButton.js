import React from "react";
import { 
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";

export default class AuthButton extends React.Component {

  // handlePress() {
  //   /* Had to move prop function here, it is upset */
  //   this.props
  // }

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

