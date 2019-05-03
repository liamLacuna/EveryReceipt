import React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { styles } from "../Common/styles";

export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleEdit(item) {
    this.props.toggleEdit(item);
  }

  render() {
    let { item } = this.props;
    return (
      <View style={styles.expensePadding}>
        <View key={item.id}>
          <TouchableOpacity onPress={() => this.handleEdit(item)}>
            <Text key={item.id} style={styles.itemText}>
              {item.store}
            </Text>
            {
              typeof item.items.length === 0 ? <React.Fragment/> :
                item.items.map((x) => {
                  return (
                    <React.Fragment key={Math.random(100)}>
                      {x &&
                      <Text>
                        {x.name} , ${x.price}
                      </Text>
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
        <View style={styles.deleteBtn}>
          <Button title="x" color="#ff0000"
            onPress={() => {  
              this.props.handleDelete(item.id);
            }} /> 
        </View>
      </View>
    );
  }

}

