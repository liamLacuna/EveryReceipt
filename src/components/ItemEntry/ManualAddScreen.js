import React, { Component } from "react";
import { View, Text } from "react-native";
import FormFields from "./../Common/FormFields";
import { styles } from "../Common/styles";
import { addExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import CommonButton from "../Common/CommonButton";


class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ocrActive: false,
      error: false
    };
    this.ocrItem = {};
  };

  showError() {
    this.setState({
      error: true
    });
  }
  
  renderOCRFields() {
    let ocrActive = false;
    const { params } = this.props.navigation.state;
    const ocrValue = params ? params.ocrValue : null;
    if(ocrValue !== null) {
      let expense = {
        store: ocrValue.store,
        items: [],
        total: ocrValue.total
      };
      this.ocrItem = expense;
      ocrActive = true;
    }

    if (ocrActive) {
      return (
        <FormFields 
          fromOCR={true}
          editActive={false}
          expense={this.ocrItem}
          error={this.showError.bind(this)}
          submit={this.addExpense.bind(this)}/>
      );
    } else {
      return (
        <FormFields 
          error={this.showError.bind(this)}
          submit={this.addExpense.bind(this)}/>
      );
    }
  }

  handleGoBack() {
    this.props.navigation.navigate("HomeScreen");
  }

  addExpense(item) {
    this.props.addExpense(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <CommonButton text="Go Back" onPress={this.handleGoBack.bind(this)}>
        </CommonButton>
        {this.renderOCRFields()}
        <Text style={{ color: "red" }}>{this.state.error ? "Please enter valid fields." : ""}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (item) => dispatch(addExpense(item))
  };
};

export default connect(null, mapDispatchToProps)(ManualAddScreen);






