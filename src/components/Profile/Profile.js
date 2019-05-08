import React from "react";
import { View, CameraRoll } from "react-native";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import CommonButton from "../Common/CommonButton";
import { styles } from "../Common/styles";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {name: "Home", callback: this.goToHome.bind(this)},
        {name: "Screenshot all expenses", callback: this.seeAllExpenses.bind(this)}
      ]
    };
  }
  
  async seeAllExpenses() {
    this.props.navigation.navigate("AllExpenses");
  }

  async goToHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    const { profile } = this.props;
    return (
      <View style={styles.container} ref={this.imgRef}>
        <UserInfo profile={profile} />
        {this.state.buttons.map((btn) => {
          return (
            <CommonButton
              key={btn.name}
              text={btn.name} 
              onPress={btn.callback}
            />
          );
        })}
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

