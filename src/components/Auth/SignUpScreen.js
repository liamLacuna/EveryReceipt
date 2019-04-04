import React from "react";
import { 
  ImageBackground, 
  View, 
  Image,
} from "react-native";
import FullName from "./FullName";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import AuthButton from "./AuthButton";
import firebase from "firebase";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";

class SignUpScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "SignUpScreen");
    });
  }

  login(){
    this.props.signUp(this.state);
  }

  toggleSignUp() {
    this.props.navigation.navigate("LoginScreen");
  }

  handleChange(id, value){
    this.setState({
      [id]: value
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

