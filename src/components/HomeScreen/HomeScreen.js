import React from "react";
import { Button } from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "./ExpenseList.js";
import firebase from "firebase";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";


class HomeScreen extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
  }

  logout() {
    this.props.signOut();
  }
  goToProfile() {
    this.props.navigation.navigate("Profile");
  }
  goToManualAddScreen() {
    this.props.navigation.navigate("ManualAddScreen");
  }
  render() {
    return (
      <React.Fragment>
        <AddButton goToManual={this.goToManualAddScreen.bind(this)} />
        <Button
          title="Logout"
          onPress={this.logout.bind(this)} />
        <Button
          title="Profile"
          onPress={this.goToProfile.bind(this)} />
        <ExpenseList />
      </React.Fragment>
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
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

