import React from "react";
import { 
  ImageBackground, 
  View, 
  Image,
} from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import AuthButton from "./AuthButton";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  login(){
    this.props.navigation.navigate("HomeScreen");
  }

  toggleSignUp() {
    this.props.navigation.navigate("SignUpScreen");
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
          <EmailAndPassword handleChange={this.handleChange.bind(this)} />
          <AuthButton onPress={this.login.bind(this)} text="Login"/>
          <AuthButton onPress={this.toggleSignUp.bind(this)} text = "Sign Up" />
      </ImageBackground>
    );
  }
}

