import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d1117",
    padding: 20,
  },
  box: {
    backgroundColor: "#161b22",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderColor: "#30363d",
  },
  boxTitulo: {
    marginBottom: 30,
    alignItems: "center",
  },
  btnBox: {
    marginTop: 20,
    paddingHorizontal: 100,
  },
});

export default styles;
