import React from "react";
import { Text, View, ScrollView, Alert} from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, deleteExpense, handleCloudOCR } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { key } from "../../config/api_key";
import { ImagePicker, Permissions } from "expo";


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttons: [
        {title: "Logout", onPress: this.logout.bind(this)},
      ],
      modalVisible: false,
      valueParsed: false,
      parsedObj: { }
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
    this.props.getExpenses();
  }

  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  logout() {
    this.props.signOut();
  }

  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", {
      editItem: item
    });
  }

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
  }

  getReceiptText = async (uri) => {
    if (typeof uri === "undefined") return;
    
    let resObj = await handleCloudOCR(uri);  
    if(resObj.total !== "" || resObj.store !== "") {
      this.setState({
        valueParsed: true
      });
      this.handleAddingOCRItem(resObj);
    } else {
      this.openAlert();
    }
  }

  handleAddingOCRItem(item) {
    if(this.state.valueParsed) {
      this.props.navigation.navigate("ManualAddScreen", {
        ocrValue: item
      });
    }
  }

  useCameraHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });
    this.getReceiptText(result.base64);
  };

  useLibraryHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    this.setState({ result });
    this.getReceiptText(result.base64);
  };

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
    if (btnId === "roll")
      this.useLibraryHandler();
    if (btnId === "camera")
      this.useCameraHandler();
  }

  renderExpenseList() {
    const { expenses } = this.props;
    if(expenses.length === 0) {
      return (<Text style={styles.logoText}>You don't have any expenses! Add some below.</Text>);
    } else {
      return (
        <ExpenseList
          expenses={expenses}
          deleteExpense={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)} />
      );
    }
  }

  openAlert() {
    Alert.alert(
      "Sorry, we couldn't read your receipt!",
      "",
      [
        { text: "Close", onPress: "" },
      ],
      {cancelable: false}
    );
  };

  render() {
    const { expenses } = this.props;
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setModalVisible(); }}>
            <View style={styles.container}>
              <Text style={styles.logoText} >
                Sorry, we coulnd't get anything from your scan!
              </Text>
            </View>
          </Modal> 
          <ScrollView style={styles.scrollView}>
            {this.renderExpenseList()}
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getExpenses: () => dispatch(getExpenses()),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

