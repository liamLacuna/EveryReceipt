import React from "react";
import { Modal, Text, View, ScrollView} from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import CommonButton from "../Common/CommonButton.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { key } from "../../config/api_key";
import { ImagePicker, Permissions, Constants } from "expo";


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

  handleCloudOCR = async (uri) => {
    if (typeof uri === "undefined") return;
    
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 },
            ],
            image: {
              content: uri
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          key,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );

      let store = null;
      
      let test = JSON.stringify(response);
      test = 
        test.substring(
          test.lastIndexOf("\"text\\"), test.lastIndexOf("}"));
      test = test.split("\\n");

      let result = -1;
      for(var i in test) {
        if(test[i].toLowerCase().indexOf("total") !== -1 &&
        test[i].toLowerCase().indexOf("subtotal") === -1) {
          let total = test[i].match(/\d+(?:\.\d+)?/g);
          if(total !== null) {
            result = total[0];
          }
          break;
        }
        if (test[i].toLowerCase().includes("walmart")) {
          store = "Walmart";
        } else if (test[i].toLowerCase().includes("target")) {
          store = "Target";
        } else if (test[i].toLowerCase().includes("walgreens")) {
          store = "Walgreens";
        }
      }
      
      if(result !== -1 || store !== null) {
        
        const parsedObj = {
          total: result === -1 ? "" : result,
          store: store === null ? "" : store
        };
        this.setState({
          parsedObj
        });
        setTimeout(() => { }, 1000);
        this.setState({
          valueParsed: true
        });
        this.handleAddingOCRItem(parsedObj);
      } else {
        this.setModalVisible();
      }
    } catch(err) { }
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
    this.handleCloudOCR(result.base64);
  };
  useLibraryHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    this.setState({ result });
    this.handleCloudOCR(result.base64);
  };

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
    if (btnId === "roll")
      this.useLibraryHandler();
    if (btnId === "camera")
      this.useCameraHandler();
  }

  render() {
    const { expenses } = this.props;
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          {this.state.buttons.map((btn) => {
            return (
              <CommonButton
                key={btn.title}
                text={btn.title}
                onPress={btn.onPress}
              />
            );
          })}
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
          <ScrollView>
            <ExpenseList
              expenses={expenses}
              deleteExpense={this.handleDelete.bind(this)}
              toggleEdit={this.toggleEdit.bind(this)} />
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

