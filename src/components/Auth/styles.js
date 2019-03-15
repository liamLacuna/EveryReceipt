import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
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
    marginTop: 20
  },
  container: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
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
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  }
});

