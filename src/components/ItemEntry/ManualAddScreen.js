import React, { Component } from "react";
import {Button, View} from "react-native";
import FormFields from "./../Common/FormFields";
import { styles } from "../Common/styles";
import { addExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ocrActive: false
    };
    this.ocrItem = {};
  };
  
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
          submit={this.addExpense.bind(this)}/>
      );
    } else {
      return (
        <FormFields submit={this.addExpense.bind(this)}/>
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
        <Button title="back" onPress={this.handleGoBack.bind(this)}>
        </Button>
        {this.renderOCRFields()}
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






