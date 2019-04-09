import React from "react";
import { View, Button, Text } from "react-native";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import { styles } from "./styles";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  
  async goToHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    const { profile } = this.props;
    return (
      <View style={styles.base}>
        <UserInfo profile={profile} />
        <Button title="Home" onPress={this.goToHome.bind(this)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Profile);

