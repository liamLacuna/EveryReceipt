import React from "react";
import {
  TextInput,
  Picker,
  Text,
  View, TouchableOpacity
} from "react-native";
import { styles } from "../Common/styles";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryType: "store",
      query: "",
      searchOptions: [
        {label: "Store", value:"store"},
        {label: "Price (Greater Than)", value:"price-greater-than"},
        {label: "Price (Less Than)", value:"price-less-than"},
      ]
    };
  }

  handleSearch() {
    let { queryType, query } = this.state;
    this.props.handleSearch(queryType, query);
  }

  handleChange(val) {
    this.setState({
      query: val
    });
  }

  render() {
    return(
      <View>
        {/* <View style={styles.row}> */}
        <TextInput
          style={styles.search}
          textAlign="center"
          placeholder="Search Expenses Here..."
          onChangeText={(text) => this.handleChange(text)} />
        <Picker
          selectedValue={this.state.queryType}
          style={styles.dropdown}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({queryType: itemValue})
          }>
          {
            this.state.searchOptions.map((option) => {
              return (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              );
            })
          }
        </Picker>
        {/* </View> */}
        <TouchableOpacity onPress={this.handleSearch.bind(this)}
          style={styles.btnAdd} >
          <Text style={styles.text} >Search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

