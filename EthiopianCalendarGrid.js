// EthiopianCalendarGrid.js
import { toGregorian } from "ethiopian-date";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function generateEthiopianMonthGrid(year, month) {
  const daysInMonth = month === 13 ? 5 : 30;
  const firstGC = toGregorian(year, month, 1);
  const start = new Date(firstGC[0], firstGC[1] - 1, firstGC[2]);
  const startWeekday = start.getDay();

  const grid = [];

  const prevMonth = month === 1 ? 13 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevDays = prevMonth === 13 ? 5 : 30;
  for (let i = startWeekday - 1; i >= 0; i--) {
    const ethDay = prevDays - i;
    const [gy, gm, gd] = toGregorian(prevYear, prevMonth, ethDay);
    grid.push({
      ethYear: prevYear,
      ethMonth: prevMonth,
      ethDay,
      gregorianDate: new Date(Date.UTC(gy, gm - 1, gd)),
      isCurrentMonth: false,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const [gy, gm, gd] = toGregorian(year, month, d);
    grid.push({
      ethYear: year,
      ethMonth: month,
      ethDay: d,
      gregorianDate: new Date(Date.UTC(gy, gm - 1, gd)),
      isCurrentMonth: true,
    });
  }

  let nextDay = 1;
  while (grid.length % 7 !== 0) {
    const nextMonth = month === 13 ? 1 : month + 1;
    const nextYear = month === 13 ? year + 1 : year;
    const [gy, gm, gd] = toGregorian(nextYear, nextMonth, nextDay++);
    grid.push({
      ethYear: nextYear,
      ethMonth: nextMonth,
      ethDay: nextDay - 1,
      gregorianDate: new Date(Date.UTC(gy, gm - 1, gd)),
      isCurrentMonth: false,
    });
  }

  return grid;
}

export default function EthiopianCalendarGrid({
  year,
  month,
  onSelect,
  selectedDate,
}) {
  const days = generateEthiopianMonthGrid(year, month);

  return (
    <FlatList
      data={days}
      numColumns={7}
      contentContainerStyle={styles.gridContainer}
      keyExtractor={(item, idx) =>
        `${item.ethYear}-${item.ethMonth}-${item.ethDay}-${idx}`
      }
      renderItem={({ item }) => {
        const isoDate = item.gregorianDate.toISOString().split("T")[0];
        const isSelected = isoDate === selectedDate;

        return (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={styles.flexCell}
          >
            <View
              style={[
                styles.dayContainer,
                !item.isCurrentMonth && styles.fadedText,
                isSelected && styles.selectedDayContainer,
              ]}
            >
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}
              >
                {item.ethDay}
              </Text>
              <Text
                style={[
                  styles.subDayText,
                  isSelected && styles.selectedDayText,
                ]}
              >
                {item.gregorianDate.getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 0,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 2,
  },
  flexCell: {
    flex: 1,
    alignItems: "center",
    marginVertical: 7, // Adjusted to 0 from 7
  },
  dayContainer: {
    width: 46, // Match width of weekday headers
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    margin: 2, // Adjusted to 0 from 2
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  subDayText: {
    fontSize: 10,
    color: "#666",
  },
  fadedText: {
    opacity: 0.4,
  },
  selectedDayContainer: {
    backgroundColor: "#cdeffd",
    borderRadius: 6,
  },

  selectedDayText: {
    fontWeight: "bold",
    color: "#0077cc",
  },
});
