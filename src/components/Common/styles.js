import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  btnEye: {
    position: "absolute",
    top: 8,
    right: 37
  },
  btnLogin: {
    width: Dimensions.get("window").width - 85,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#432577",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnAdd: {
    width: Dimensions.get("window").width - 85,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#3CCA41",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnOK: {
    position: "absolute",
    bottom: 100
  },
  cancelButton: {
    position: "absolute",
    left: 70,
    bottom: 70
  },
  confirmButton: {
    position: "absolute",
    right: 70,
    bottom: 70
  },
  col: {
    marginTop: 10,
    minWidth: "20%",
    minHeight: "10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  manualadd: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 100,
  },
  dropdown: {
    width: Dimensions.get("window").width - 125,
    height: 45,
  },
  deleteBtn: {
    position: "absolute",
    right: 65,
  },
  expenseItem: {
    position: "relative",
    width: Dimensions.get("window").width - 85,
    height: 45,
    marginHorizontal: 25
  },
  expensePadding: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    width: Dimensions.get("window").width - 65
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },
  logoText: {
    color: "black",
    fontSize: 35,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.5,
    marginLeft: 30
  },
  input: {
    width: Dimensions.get("window").width - 85,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37
  },
  inputContainer: {
    marginTop: 10
  },
  itemText: {
    color: "black", 
    fontSize: 30
  },
  itemSubText: {
    color: "black", 
    fontSize: 20
  },
  profileName: {
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.5
  },
  profileText: {
    color: "#0f2962",
    fontSize: 20,
    opacity: 0.5
  },
  row: {
    minWidth: "20%",
    minHeight: "10%",
    flexDirection: "row",
  },
  search: {
    width: Dimensions.get("window").width - 135,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 25
  },
  scrollView: {
    marginRight: 100,
    marginLeft: 20
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
});

