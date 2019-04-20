import React from "react";
import CommonButton from "../Common/CommonButton";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";
import FormFields from "../Common/FormFields";
import { editExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

class ItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      prevouslyEdited: false,
      //item fields
      id: "",
      store: "",
      items: [{}],
      total: ""
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    });
  }

  submitEdit(expense) {
    this.setState({
      store: expense.store,
      items: expense.items,
      total: expense.total
    }, () => setTimeout(() => {}, 1500));
    this.props.editExpense(this.state.id, expense);
    this.hideEditor();
  }

  hideEditor() {
    this.setState({
      prevouslyEdited: true,
      editActive: false,
    });
  }

  openEditor() {
    if(!this.state.prevouslyEdited) {
      const { params } = this.props.navigation.state;
      const editItem = params ? params.editItem : null;
      this.setState({
        id: editItem.id,
        store: editItem.store,
        items: editItem.items,
        total: editItem.total
      }, () => setTimeout(() => {}, 1500));
    }
    this.setState({
      editActive: true
    });
  }

  renderItemsFromExpense(itemList) {
    let index = 1;
    return (
      <React.Fragment>
        {itemList.map((item) => {
          return (
            <Text 
              key={Math.random(100)}
              style={styles.itemSubText}  
            >
              {index++}.  {item.name}, ${item.price}
            </Text>
          );
        })}
      </React.Fragment>
    );
  }

  /**
   * id: doc.id,
   * store: curr.store,
   * items: curr.items,
   * total: curr.total
   */

  getExpenseInfo() {
    const { params } = this.props.navigation.state;
    const editItem = params ? params.editItem : null;
    if(this.state.editActive)
    {
      const expense = {
        store: this.state.store,
        items: this.state.items,
        total: this.state.total
      };
      return(
        <FormFields 
          editActive={true}
          expense={expense}
          submit={this.submitEdit.bind(this)}
          submitText="Save"
        />
      );
    } else {
      const { prevouslyEdited } = this.state;
      return (
        <React.Fragment>
          <Text style={styles.itemText}>
            Store: {prevouslyEdited ? this.state.store : editItem.store}
          </Text>
          <Text style={styles.itemText}>
            Items: 
          </Text>
          {this.renderItemsFromExpense(
            prevouslyEdited ? this.state.items : editItem.items
          )}
          <Text style={styles.itemText}>
            Total: ${prevouslyEdited ? this.state.total : editItem.total}
          </Text>
        </React.Fragment>
      );
    }
  }

  renderButtons() {
    if(this.state.editActive) {
      return(
        <CommonButton text={"Cancel"} onPress={this.hideEditor.bind(this)} />
      );
    } else {
      return (
        <React.Fragment>
          <CommonButton text={"Edit Item"} onPress={this.openEditor.bind(this)} />
          <CommonButton text={"Go Back to Home"} onPress={this.goHome.bind(this)} />
        </React.Fragment>
      );
    }
  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.getExpenseInfo()}
        {this.renderButtons()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense))
  };
};

export default connect(null, mapDispatchToProps)(ItemEdit);

