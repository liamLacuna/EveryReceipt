import React from "react";
import ExpenseItem from "../HomeScreen/ExpenseItem";

export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return(
      <React.Fragment>
        {expenses.map((exp, key) => {
          return(
            <ExpenseItem 
              key={key} 
              handleDelete={this.handleDelete.bind(this)}
              toggleEdit={this.props.toggleEdit.bind(this)}
              item={exp} />
          );
        })}
      </React.Fragment>
    );
  }
}
