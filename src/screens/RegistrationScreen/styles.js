import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center'
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    width: 130,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#006400",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#006400",
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    textAlign: "center",
  },
  mainTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
});
