import React from "react";
import {
  ImageBackground,
  View,
  Image,
  Text
} from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "../Common/styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import CommonButton from "../Common/CommonButton";
import firebase from "firebase";
import { connect } from "react-redux";
import { signIn } from "../../actions/authActions";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttons: [
        {text: "Login", onPress: this.login.bind(this)},
        {text: "Sign Up", onPress: this.toggleSignUp.bind(this)}
      ]
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoginScreen");
    });
  }

  login() {
    this.props.signIn(this.state);
    // this.props.navigation.navigate("HomeScreen");
  }

  toggleSignUp() {
    this.props.navigation.navigate("SignUpScreen");
  }

  handleChange(id, value) {
    this.setState({
      [id]: value
    });
  }

  render() {
    const { authError } = this.props;
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <EmailAndPassword handleChange={this.handleChange.bind(this)} />
        {this.state.buttons.map((btn) => {
          return (
            <CommonButton 
              key={btn.text}
              onPress={btn.onPress} 
              text={btn.text}
            />
          );
        })}
        <Text style={{ color: "red" }}>
          {authError ? "Login Failed." : ""}
        </Text>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

