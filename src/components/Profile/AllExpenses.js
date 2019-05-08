import React from "react";
import ExpenseItem from "../HomeScreen/ExpenseItem";
import CommonButton from "../Common/CommonButton";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import { getExpenses, getTotalPrice } from "../../actions/expenseActions";
import { styles } from "../Common/styles";

class AllExpenses extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.getExpenses();
    this.props.getTotalPrice();
  }
  
  render() {
    const { expenses, totalPrice } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>
          Your total expenses: ${totalPrice}
        </Text>
        <ScrollView>
          {expenses.map((exp) => {
            return (
              <ExpenseItem 
                key={exp.id} 
                displayOnly={true}
                item={exp}
              />
            );
          })}
        </ScrollView>
        <CommonButton
          text="Back to Profile"
          onPress={() => { this.props.navigation.navigate("Profile"); }}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenses: () => dispatch(getExpenses()),
    getTotalPrice: () => dispatch(getTotalPrice())
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses,
    totalPrice: state.expense.totalPrice
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllExpenses);

