import React from "react";
import { 
  View,
  Text
} from "react-native";
import { styles } from "../Common/styles";
import SearchBar from "./SearchBar";
import CommonButton from "../Common/CommonButton";
import ExpenseList from "../Common/ExpenseList";
import { searchExpenses, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryType: ""
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const query = params ? params.query : null;
    const queryType = params ? params.queryType : null;
    this.props.searchExpenses(queryType, query);
  }

  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", { 
      editItem: item,
      searchActive: true,
      query: this.state.query,
      queryType: this.state.queryType
    });
  }

  renderExpenseList() {
    let { searchResults } = this.props;
    if(typeof searchResults !== "undefined" && searchResults.length !== 0) {
      return (
        <ExpenseList 
          expenses={searchResults}
          deleteExpense={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)} />
      );
    } else {
      return (
        <Text>No results</Text>
      );
    }
  }

  handleDelete(id) {
    this.props.deleteExpense(id);
    this.props.searchExpenses(this.state.queryType, this.state.query);
  }

  handleSearch(queryType, query) {
    this.props.searchExpenses(queryType, query);
    this.setState({
      queryType: queryType,
      query: query
    });
    // setTimeout(() => {}, 1500);
    this.renderExpenseList();
  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return(
      <View style={styles.container}>
        <CommonButton 
          onPress={this.goHome.bind(this)}
          text="Go Home"
        />
        <SearchBar 
          handleSearch={this.handleSearch.bind(this)} />
        {this.renderExpenseList()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchExpenses: (queryType, query) => dispatch(searchExpenses(queryType, query)),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.expense.searchResults
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

