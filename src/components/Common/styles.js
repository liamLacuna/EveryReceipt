import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  backButton: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    marginTop: -5,
    position: "absolute", // add if dont work with above
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
  },
  dropdown: {
    width: Dimensions.get("window").width - 125,
    height: 45,
  },
  deleteBtn: {
    position: "absolute",
    right: 0
  },
  expenseItem: {
    position: "relative",
    width: Dimensions.get("window").width - 85,
    height: 45,
    marginHorizontal: 25
  },
  expensePadding: {
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50
  },
  logoText: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    opacity: 0.5
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
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
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
});

