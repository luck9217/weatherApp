import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
  },
  weatherCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  time: {
    fontSize: 14,
    color: "#777",
  },
  temp: {
    fontSize: 20,
    color: "#007bff",
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
  },
  desc: {
    fontSize: 16,
    fontStyle: "italic",
    textTransform: "capitalize",
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 10,
    marginVertical: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  // 🛠️ Added missing error style
  error: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
