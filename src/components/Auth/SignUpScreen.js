import React from "react";
import { 
  ImageBackground, 
  View, 
  Image,
} from "react-native";
import FullName from "./FullName";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "../Common/styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import CommonButton from "../Common/CommonButton";
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
      buttons: [
        {text: "Sign Up", onPress: this.login.bind(this)},
        {text: "Cancel", onPress: this.toggleSignUp.bind(this)}
      ]
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
        {this.state.buttons.map((btn) => {
          return (
            <CommonButton 
              key={btn.text}
              onPress={btn.onPress} 
              text={btn.text}
            />
          );
        })}
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

