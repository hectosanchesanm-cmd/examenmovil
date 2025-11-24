import { StyleSheet } from "react-native";

const todoStyle = StyleSheet.create({
  addTask: {
    position: "absolute",
    bottom: 48,
    right: 48,
  },
  fotovacia: {
    height: 200,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    backgroundColor: "grey",
  },
  tomarfotoButton: {
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default todoStyle;
