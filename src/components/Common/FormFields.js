import React, { Component } from "react";
import {View, TextInput, Button, ScrollView} from "react-native";
import { styles } from "./styles";
import { addExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import CommonButton from "./CommonButton";
import AddItemButton from "../ItemEntry/AddItemButton";

export default class FormFields extends Component {
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

  componentDidMount() {
    this.ensureValesSaved();
  }

  ensureValesSaved() {
    
    let { expense } = this.props;
    if(this.props.editActive)
    { 
      let count = expense.items.length;
      let items = expense.items.length ? expense.items : [{}];
      this.setState({
        store: expense.store,
        total: expense.total,
        items: items,
        pairCount: count
      });
    }
    else if(this.props.fromOCR)
    {
      this.setState({
        store: expense.store,
        total: expense.total
      });
    }
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
    const { items, store, total } = this.state;
    let expenseItems = [];
    let valid = true;
    for(let i = 0; i < items.length; i++) {
      if(typeof items[i].name !== "undefined" && 
        typeof items[i].price !== "undefined") {
        expenseItems.push(items[i]);
      }
    }
    if(typeof store === "undefined" || store === "" 
    || total === 0 || total === "") {
      valid = false;
    }

    if(valid) {
      let itemObj = {
        store: this.state.store,
        items: expenseItems,
        total: parseFloat(this.state.total).toFixed(2)
      };
      this.props.submit(itemObj);
    } else {
      this.props.error();
    }

  }

  generateKeyOrValueInputs(isKey) {
    let inputType = (isKey ? "Item name" : "Price");
    let inputId = (isKey ? "item" : "price");
    let inputElements = [];

    if(this.props.editActive && this.props.expense.items.length !== 0) {
      for (let i = 0; i < this.state.pairCount; i++) {
        inputElements.push(<TextInput 
          placeholder={`${inputType} ${i}`} 
          defaultValue={
            this.props.editActive && i < this.props.expense.items.length ? 
              isKey ?  
                this.props.expense.items[i].name
                : this.props.expense.items[i].price
              : ""}
          id={inputId}
          name={i} 
          key={`${inputId}-${i}`} 
          onChangeText={(text) => this.handleItemChange(i, inputId, text)}
        />);
      }
    } else {
      for (let i = 0; i < this.state.pairCount + 1; i++) {
        inputElements.push(<TextInput 
          placeholder={`${inputType} ${i + 1}`} 
          id={inputId}
          name={i} 
          key={`${inputId}-${i}`} 
          onChangeText={(text) => this.handleItemChange(i, inputId, text)}
        />);
      }
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
          <AddItemButton
            onPress={this.addKeyValuePair.bind(this)}
            title="Add Item"
            text="Add Item"
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
                defaultValue={this.props.editActive || this.props.fromOCR
                  ? this.props.expense[f.id] : ""}
                textAlign="center"
                underlineColorAndroid="transparent"
                placeholder={f.name}
                onChangeText={(text) => this.handleChange(f.id, text)}
              />
              :
              this.renderItemsEntry()
          );
        })}
        <CommonButton 
          text={this.props.submitText ? this.props.submitText : "Submit"} 
          onPress={this.addItemToDB.bind(this)}  
        />
      </View>
    );
  }
}


