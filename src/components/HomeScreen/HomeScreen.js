import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "./ExpenseList.js";
import CommonButton from "../Common/CommonButton.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";


class HomeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      buttons: [
        {title: "Logout", onPress: this.logout.bind(this)},
        {title: "Profile", onPress: this.goToProfile.bind(this)}
      ]
    };
  }

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
  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", { 
      editItem: item
    });
  }
  handlePress(btnId) {

    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
  }
  render() {
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          {this.state.buttons.map((btn) => {
            return (
              <CommonButton 
                key={btn.title} 
                text={btn.title} 
                onPress={btn.onPress}
              />
            );
          })}
          <ExpenseList toggleEdit={this.toggleEdit.bind(this)} />
        </View>
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

