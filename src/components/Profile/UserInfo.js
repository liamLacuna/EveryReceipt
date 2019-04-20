import React from "react";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    const { profile } = this.props;
    this.state = {
      profileData: [
        {val: profile.firstName, id: 0}, 
        {val: profile.lastName, id: 1}
      ]
    };
  }
  
  render() {
    return (
      <View style={styles.container} >
        {this.state.profileData.map((x) => {
          return (
            <Text key={x.id} style={styles.profileText} >
              {x.val}
            </Text>
          );
        })}
      </View>
    );
  }
}

