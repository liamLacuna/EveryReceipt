import React from "react";
import { Text, Button } from "react-native";
import { styles } from "../Auth/styles";

export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { item } = this.props;
    return (
      <React.Fragment key={item.id}>
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
        <Button title="x"
          onPress={() => {  
            this.props.handleDelete(item.id);
          }} /> 
      </React.Fragment>
    );
  }

}

