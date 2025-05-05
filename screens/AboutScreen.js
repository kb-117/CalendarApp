import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const developers = [
  { name: "Sye Balga", id: "131/12" },
  { name: "Kibret Guesh", id: "080/12" },
  { name: "Metkel K/mariyam", id: "105/12" },
  { name: "Diyana Kasahun", id: "037/12" },
  { name: "Mahliet Aregay", id: "183/12" },
  { name: "Fyori Haile", id: "219/12" },
  { name: "Natnael Asefa", id: "206/12" },
  { name: "Robel Teklebrhan", id: "318/12" },
  { name: "Kibrom Kidanemaryam", id: "236/12" },
];

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mekelle Institute of Technology</Text>

      <Text style={styles.description}>
        This application was built by a dedicated team of students for academic
        purposes.
      </Text>

      <Text style={styles.subtitle}>Developers</Text>
      <FlatList
        data={developers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.devRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.id}>{item.id}</Text>
          </View>
        )}
      />

      <Text style={styles.footer}>
        © 2025 Mekelle Institute of Technology. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  year: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 20,
    fontStyle: "italic",
    color: "#555",
    borderSize: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  devRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 16,
  },
  id: {
    fontSize: 16,
    color: "#555",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
});
