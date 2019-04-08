import React from "react";
import {
  ImageBackground,
  View,
  Image,
  Text
} from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import AuthButton from "./AuthButton";
import firebase from "firebase";
import { connect } from "react-redux";
import { signIn } from "../../actions/authActions";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
        <AuthButton onPress={this.login.bind(this)} text="Login" />
        <AuthButton onPress={this.toggleSignUp.bind(this)} text="Sign Up" />
        <Text style={{ color: "red" }}>
          {authError ? "Login Failed." : ""}
          {this.state.email}
          {this.state.password}
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

