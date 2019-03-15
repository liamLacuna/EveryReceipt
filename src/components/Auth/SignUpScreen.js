import React from "react";
import { 
  Text, 
  Button, 
  ImageBackground, 
  View, 
  Image,
  TextInput,
} from "react-native";
import FullName from "./FullName";
import EmailAndPassword from "./EmailAndPassword";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import AuthButton from "./AuthButton";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  login(){
    this.props.navigation.navigate("HomeScreen");
  }

  toggleSignUp() {
    this.props.navigation.navigate("LoginScreen");
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return(
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <FullName handleChange={this.handleChange.bind(this)} />
        <EmailAndPassword handleChange={this.handleChange.bind(this)} />
        <AuthButton text="Login" onPress={this.login.bind(this)} />
        <AuthButton text="Cancel" onPress={this.toggleSignUp.bind(this)} />
      </ImageBackground>
    );
  }
}

