import React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { styles } from "../Common/styles";

export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOnly: false
    };
  }

  componentDidMount() {
    this.setState({
      displayOnly: typeof this.props.displayOnly !== "undefined"
    });
  }  

  renderDeleteButton(item) {
    if(this.state.displayOnly) {
      return;
    } else {
      return (
        <View style={styles.deleteBtn}>
          <Button title="x" color="#ff0000"
            onPress={() => {  
              this.props.handleDelete(item.id);
            }} /> 
        </View>
      );
    }
  }

  handleEdit(item) {
    if(!this.state.displayOnly) {
      this.props.toggleEdit(item);
    }
  }

  render() {
    let { item } = this.props;
    return (
      <View key={item.id} style={styles.expensePadding}>
        <View key={item.id}>
          <TouchableOpacity onPress={() => this.handleEdit(item)}>
            <Text key={item.id} style={styles.itemText}>
              {item.store}
            </Text>
            {
              typeof item.items.length === 0 ? <React.Fragment/> :
                item.items.map((x, key) => {
                  return (
                    <React.Fragment key={key}>
                      {x.name !== "" && x.price !== "" 
                        && typeof x.name !== "undefined" 
                        && typeof x.price !== "undefined"?
                        <Text>
                          {x.name} , ${x.price}
                        </Text>
                        : <React.Fragment/>
                      }
                    </React.Fragment>
                  );
                })
            }
            <Text style={{fontSize: 20}}>
              total: ${item.total}
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderDeleteButton(item)}
      </View>
    );
  }

}

