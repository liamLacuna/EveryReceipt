import React from "react";
import {View, TouchableOpacity, Text, Button, Modal} from "react-native";
import { styles } from "../Common/styles";
import Icon from "react-native-vector-icons/FontAwesome";


export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOnly: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      displayOnly: typeof this.props.displayOnly !== "undefined"
    });
  }

  openModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  renderDeleteButton(item) {
    if(this.state.displayOnly) {
      return;
    } else {
      return (
        <View style={styles.deleteBtn}>
          <Button title="x" color="#ff0000"
            onPress={
              this.openModal
            } />
          <Modal  transparent={false}
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => { this.openModal(); }}>
            <View style={styles.container}>
              <Text style={styles.logoText} >
               Are you sure you want to delete this item?
              </Text>
              <View style={styles.cancelButton}>
                <Icon.Button name="window-close" borderRadius={0} backgroundColor="white" size={35} color="red" onPress={this.openModal}/>
              </View>
              <View style={styles.confirmButton}>
                <Icon.Button name="check-square" borderRadius={0} backgroundColor="white" size={35} color="green"  onPress={() => {
                  this.props.handleDelete(item.id);
                  this.openModal();
                }}/>
              </View>
            </View>
          </Modal>
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

