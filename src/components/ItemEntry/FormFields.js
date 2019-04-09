import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import AuthButton from "../Auth/AuthButton";
import { styles } from "../Auth/styles";
import { addExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

class FormFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairCount: 0,
      store: "",
      total: 0,
      fields: [
        { name: "Store Name", id: "store"},
        { name: "Items", id: "items"},
        { name: "Total Amount", id: "total"},
      ],
      items: [{}]
    };
  }

  handleChange(id, val) {
    this.setState({
      [id]: val
    });
  }

  handleItemChange(index, type, val) {
    let temp = [...this.state.items];
    if(type === "item") {
      temp[index].name = val;
    } else {
      temp[index].price = parseFloat(val).toFixed(2);
    }
    this.setState({
      items: temp
    });
  }

  addItemToDB() {
    let itemObj = {
      store: this.state.store,
      items: this.state.items,
      total: parseFloat(this.state.total).toFixed(2)
    };
    this.props.addExpense(itemObj);
  }

  generateKeyOrValueInputs(isKey) {
    let inputType = (isKey ? "Item name" : "Price");
    let inputId = (isKey ? "item" : "price");
    let inputElements = [];

    for (let i = 0; i < this.state.pairCount + 1; i++) {
      inputElements.push(<TextInput 
        placeholder={`${inputType} ${i}`} 
        id={inputId}
        name={i} 
        key={`${inputId}-${i}`} 
        onChangeText={(text) => this.handleItemChange(i, inputId, text)}
      />);
    }

    return inputElements;
  }

  addKeyValuePair() {
    let oldItems = [...this.state.items];
    oldItems.push({});
    this.setState({
      items: oldItems,
      pairCount: this.state.pairCount + 1,
    });
  }

  renderItemsEntry() {
    let entries = [1, 0];
    return (
      <React.Fragment key={"items-entry"}>
        <View style={styles.row}>
          {entries.map((x) => {
            return ( 
              <View key={x} style={styles.col}>
                {this.generateKeyOrValueInputs(x)}
              </View>
            );
          })}
        </View>
        <View style={styles.row}>
          <Button 
            onPress={this.addKeyValuePair.bind(this)} 
            style={{minWidth: 10, minHeight: 10}}
            title="Add Another Item"
          />
        </View>
      </React.Fragment>
    );
  }
  
  render() {
    return (
      <View style={styles.col}>
        {this.state.fields.map((f) => {
          return(
            f.id !== "items" ?
              <TextInput 
                key={f.id}
                style={styles.input}
                textAlign="center"
                underlineColorAndroid="transparent"
                placeholder={f.name}
                onChangeText={(text) => this.handleChange(f.id, text)}
              />
              :
              this.renderItemsEntry()
          );
        })}
        <AuthButton 
          text="Submit" 
          onPress={this.addItemToDB.bind(this)} />
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (item) => dispatch(addExpense(item))
  };
};

export default connect(null, mapDispatchToProps)(FormFields);

