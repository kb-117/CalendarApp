import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from "react-native";
import { toGregorian, toEthiopian } from "ethiopian-date";

export default function ConverterScreen() {
  const [isEthToGreg, setIsEthToGreg] = useState(true);

  // Ethiopian input state
  const [ethYear, setEthYear] = useState("2016");
  const [ethMonth, setEthMonth] = useState("9");
  const [ethDay, setEthDay] = useState("25");

  // Gregorian input state
  const [gregYear, setGregYear] = useState("2023");
  const [gregMonth, setGregMonth] = useState("5");
  const [gregDay, setGregDay] = useState("3");

  const [result, setResult] = useState(null);

  useEffect(() => {
    const today = new Date();

    // Gregorian
    setGregYear(today.getFullYear().toString());
    setGregMonth((today.getMonth() + 1).toString());
    setGregDay(today.getDate().toString());

    // Ethiopian
    const [ey, em, ed] = toEthiopian(
      today.getUTCFullYear(),
      today.getUTCMonth() + 1,
      today.getUTCDate()
    );
    setEthYear(ey.toString());
    setEthMonth(em.toString());
    setEthDay(ed.toString());
  }, []);

  const handleConvert = () => {
    try {
      if (isEthToGreg) {
        const [gy, gm, gd] = toGregorian(
          parseInt(ethYear),
          parseInt(ethMonth),
          parseInt(ethDay)
        );
        setResult(
          `Gregorian: ${gy}-${String(gm).padStart(2, "0")}-${String(
            gd
          ).padStart(2, "0")}`
        );
      } else {
        const [ey, em, ed] = toEthiopian(
          parseInt(gregYear),
          parseInt(gregMonth),
          parseInt(gregDay)
        );
        setResult(
          `Ethiopian: ${ey}-${String(em).padStart(2, "0")}-${String(
            ed
          ).padStart(2, "0")}`
        );
      }
    } catch (e) {
      setResult("Invalid date");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date Converter</Text>

      <View style={styles.toggleRow}>
        <Text style={styles.label}>GC → EC</Text>
        <Switch value={isEthToGreg} onValueChange={setIsEthToGreg} />
        <Text style={styles.label}>EC → GC</Text>
      </View>

      {isEthToGreg ? (
        <View>
          <Text style={styles.labelName}>Ethiopian Date</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Year"
              keyboardType="numeric"
              value={ethYear}
              onChangeText={setEthYear}
            />
            <TextInput
              style={styles.input}
              placeholder="Month"
              keyboardType="numeric"
              value={ethMonth}
              onChangeText={setEthMonth}
            />
            <TextInput
              style={styles.input}
              placeholder="Day"
              keyboardType="numeric"
              value={ethDay}
              onChangeText={setEthDay}
            />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.labelName}>Gregorian Date</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Year"
              keyboardType="numeric"
              value={gregYear}
              onChangeText={setGregYear}
            />
            <TextInput
              style={styles.input}
              placeholder="Month"
              keyboardType="numeric"
              value={gregMonth}
              onChangeText={setGregMonth}
            />
            <TextInput
              style={styles.input}
              placeholder="Day"
              keyboardType="numeric"
              value={gregDay}
              onChangeText={setGregDay}
            />
          </View>
        </View>
      )}

      <Button title="Convert" onPress={handleConvert} />

      {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  labelName: {
    fontSize: 16,
    marginHorizontal: 8,
    marginBottom: 10,
    paddingTop: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    width: "30%",
    textAlign: "center",
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: "#007700",
    textAlign: "center",
  },
});
